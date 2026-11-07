# Render the neutral figure's views as two layers each:
#   out/<view>-shade.png  soft studio shading on transparent ground (becomes a luminance mask)
#   out/<view>-line.png   Freestyle contour lines, black on white (traced to SVG by trace.py)
# Run: Blender -b --python render.py -- [view ...]
import bpy, sys, os, math
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import body as B

# Full figure frame: 1.76 m tall, centred 0.83 m up -> the site's 400×1000 viewBox.
FIG_SCALE, FIG_CZ = 1.76, 0.83

# view: camera location, rotation (deg), ortho scale, resolution (w, h)
VIEWS = {
    "front": ((0, -5, FIG_CZ), (90, 0, 0), FIG_SCALE, (1600, 4000)),
    "back":  ((0,  5, FIG_CZ), (90, 0, 180), FIG_SCALE, (1600, 4000)),
}

def foot_mask(body):
    """Vertex group with only the left lower leg, so the other leg cannot block a foot view."""
    vg = body.vertex_groups
    if "leftfoot" in vg: return
    r = vg["render"].index
    for name, top in (("leftfoot", 0.6), ("leftsole", 0.11)):
        keep = vg.new(name=name)
        for v in body.data.vertices:
            if v.co.x > 0.02 and v.co.z < top and any(g.group == r for g in v.groups):
                keep.add([v.index], 1.0, 'REPLACE')

def look(sc, target, direction, up, scale, res):
    """Ortho camera looking along `direction` at `target`, with `up` as the image's up."""
    from mathutils import Vector, Matrix
    d, u = Vector(direction).normalized(), Vector(up).normalized()
    x = d.cross(u).normalized(); y = x.cross(d)
    m = Matrix((x, y, -d)).transposed().to_4x4()
    m.translation = Vector(target) - d * 3
    camera(sc, (0, 0, 0), (0, 0, 0), scale, res)
    sc.camera.matrix_world = m

def camera(sc, loc, rot, scale, res):
    cam = bpy.data.objects.get("cam")
    if not cam:
        cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam")); sc.collection.objects.link(cam)
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = scale
    cam.location = loc; cam.rotation_euler = [math.radians(a) for a in rot]
    sc.camera = cam
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.resolution_percentage = 100

def shade_pass(sc, path):
    sc.render.engine = 'BLENDER_WORKBENCH'
    sh = sc.display.shading
    sh.light = 'STUDIO'; sh.color_type = 'SINGLE'; sh.single_color = (0.8, 0.8, 0.8)
    sh.show_cavity = True; sh.cavity_type = 'BOTH'; sh.show_shadows = False
    sc.render.use_freestyle = False
    sc.render.film_transparent = True
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)

def line_pass(sc, body, path):
    sc.render.engine = 'BLENDER_EEVEE'
    mat = bpy.data.materials.get("white") or bpy.data.materials.new("white")
    mat.use_nodes = True
    nt = mat.node_tree; nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission"); em.inputs[0].default_value = (1, 1, 1, 1)
    out = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(em.outputs[0], out.inputs[0])
    body.data.materials.clear(); body.data.materials.append(mat)
    w = sc.world or bpy.data.worlds.new("w"); sc.world = w
    w.use_nodes = True; w.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1)
    sc.view_settings.view_transform = 'Standard'
    sc.render.film_transparent = False
    sc.render.use_freestyle = True
    sc.render.line_thickness_mode = 'ABSOLUTE'; sc.render.line_thickness = 2.2
    vl = sc.view_layers[0]; fs = vl.freestyle_settings
    fs.crease_angle = math.radians(140)
    ls = fs.linesets[0] if fs.linesets else fs.linesets.new("lines")
    ls.select_by_visibility = True; ls.visibility = 'VISIBLE'
    ls.select_by_edge_types = True
    ls.select_silhouette = True; ls.select_border = True; ls.select_crease = False; ls.select_contour = True
    ls.select_suggestive_contour = False; ls.select_ridge_valley = False
    st = ls.linestyle; st.color = (0, 0, 0); st.thickness = 2.2; st.chaining = 'PLAIN'
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)

# Foot plates (left foot): profile 260×150 viewBox, sole 120×260; rendered at 6×.
# Directions are in the foot's own frame: f = heel-to-toe, s = outward (lateral).
FOOT_VIEWS = {
    # name: direction, up, ortho scale (m), resolution
    "medial":  (("s", 1), ("z", 1), 0.30, (1560, 900)),    # from inside: toes to the right
    "lateral": (("s", -1), ("z", 1), 0.30, (1560, 900)),   # from outside: toes to the left
    "sole":    (("z", 1), ("f", 1), 0.30, (720, 1560)),    # from below: toes up, big toe left
}

def foot_frame(body):
    """Centre of the left foot's evaluated vertices below the mid-shin."""
    dg = bpy.context.evaluated_depsgraph_get(); e = body.evaluated_get(dg)
    vs = [e.matrix_world @ v.co for v in e.data.vertices]
    vs = [v for v in vs if v.x > 0.02 and v.z < 0.14]
    lo = [min(v[i] for v in vs) for i in range(3)]; hi = [max(v[i] for v in vs) for i in range(3)]
    return lo, hi

def foot_axes(rig):
    from mathutils import Vector
    pb = rig.pose.bones
    f = (pb["toe3-1.L"].head - pb["foot.L"].head); f.z = 0; f.normalize()
    z = Vector((0, 0, 1)); s = f.cross(z).normalized()   # points away from the midline for the left foot
    if s.x < 0: s = -s
    return {"f": f, "s": s, "z": z}

def render_foot(sc, body, v, lo, hi, ax):
    (dk, ds), (uk, us), scale, res = FOOT_VIEWS[v]
    d, up = ax[dk] * ds, ax[uk] * us
    cx, cy = (lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2
    if v == "sole":
        target = (cx, cy, lo[2])
    else:
        # profile: frame bottom sits just under the sole
        target = (cx, cy, lo[2] - 0.006 + scale * res[1] / res[0] / 2)
    look(sc, target, d, up, scale, res)

# Hand plate: the left hand, palm toward the viewer, fingers up. viewBox 360×470, rendered at 5×.
HAND_RES, HAND_BOX = (1800, 2350), (360, 470)
FINGERS = {"thumb": 1, "index": 2, "middle": 3, "ring": 4, "little": 5}

def hand_masks(body):
    """Vertex groups: the whole left hand, and each finger on its own."""
    vg = body.vertex_groups
    if "lefthand" in vg: return
    r = vg["render"].index
    names = {g.index: g.name for g in vg}
    hand = vg.new(name="lefthand")
    groups = {k: vg.new(name=f"f-{k}") for k in FINGERS}
    for v in body.data.vertices:
        gs = {names[g.group]: g.weight for g in v.groups}
        if "render" not in gs: continue
        w = sum(x for n, x in gs.items() if n.endswith(".L") and n.split(".")[0].startswith(("finger", "metacarpal", "wrist", "lowerarm02")))
        if w > 0.5: hand.add([v.index], 1.0, 'REPLACE')
        for k, i in FINGERS.items():
            if sum(x for n, x in gs.items() if n.startswith(f"finger{i}-") and n.endswith(".L")) > 0.5:
                groups[k].add([v.index], 1.0, 'REPLACE')

def hand_frame(sc, body, rig):
    """Camera on the left palm; returns a projector from world to viewBox units."""
    from mathutils import Vector
    pb = rig.pose.bones
    wrist, tip = pb["wrist.L"].head, pb["finger3-3.L"].tail
    ctr = (wrist + tip) / 2
    scale = 0.235  # metres across the frame's height
    look(sc, (ctr.x, ctr.y, ctr.z), (0, 1, 0), (0, 0, -1), scale, HAND_RES)
    w, h = HAND_BOX; k = h / scale
    def proj(p):  # image right = -x, image up = -z
        return [round(w / 2 - (p.x - ctr.x) * k, 1), round(h / 2 + (p.z - ctr.z) * k, 1)]
    return proj

def hand_landmarks(rig, proj):
    import json
    pb = rig.pose.bones
    out = {}
    for k, i in FINGERS.items():
        base = pb[f"finger{i}-1.L"].head; t = pb[f"finger{i}-3.L"].tail
        out[k] = {"base": proj(base), "tip": proj(t), "mid": proj((base + t) / 2)}
    # centre of the palm: between the wrist and the middle finger's base, a little toward it
    out["palm"] = proj(pb["wrist.L"].head.lerp(pb["finger3-1.L"].head, 0.55))
    json.dump(out, open(os.path.join(HERE, "out", "hand.json"), "w"), indent=1)

if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    views = argv or list(VIEWS) + list(FOOT_VIEWS) + ["hand"]
    body, rig = B.build()
    foot_mask(body); hand_masks(body)
    # bake the pose into a plain mesh so Freestyle sees final geometry
    sc = bpy.context.scene
    os.makedirs(os.path.join(HERE, "out"), exist_ok=True)
    mask = next(m for m in body.modifiers if m.type == 'MASK')
    lo, hi = foot_frame(body); ax = foot_axes(rig)
    def frame(v):
        if v == "hand":
            mask.vertex_group = "lefthand"; return hand_frame(sc, body, rig)
        if v in VIEWS:
            mask.vertex_group = "render"; camera(sc, *VIEWS[v])
        else:
            mask.vertex_group = "leftsole" if v == "sole" else "leftfoot"; render_foot(sc, body, v, lo, hi, ax)
    for v in views:
        frame(v); shade_pass(sc, os.path.join(HERE, "out", f"{v}-shade.png"))
    for v in views:
        frame(v); line_pass(sc, body, os.path.join(HERE, "out", f"{v}-line.png"))
    if "hand" in views:
        hand_landmarks(rig, frame("hand"))
        for k in FINGERS:  # one silhouette per finger, for tinting and hit areas
            mask.vertex_group = f"f-{k}"
            shade_pass(sc, os.path.join(HERE, "out", f"hand-{k}.png"))
