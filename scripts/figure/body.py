# Shared: build the neutral MakeHuman body (CC0 assets, MPFB2) in anatomical position.
# gender/age/muscle/weight at the midpoint; "proportions" at ideal.
import bpy, math, mathutils
from bl_ext.user_default.mpfb.services.humanservice import HumanService
from bl_ext.user_default.mpfb.services.targetservice import TargetService

def build(arm_out=7, supinate=90, leg_out=2.5):
    """arm_out: degrees the straight arm hangs away from vertical; supinate: forearm twist, split over its two bones."""
    for o in list(bpy.data.objects): bpy.data.objects.remove(o)
    macro = TargetService.get_default_macro_info_dict()
    macro.update({"gender": 0.5, "age": 0.5, "muscle": 0.5, "weight": 0.5, "proportions": 1.0, "cupsize": 0.0})
    body = HumanService.create_human(macro_detail_dict=macro)
    # show eyeballs with the body
    vg = body.vertex_groups
    keep = vg.new(name="render")
    idx = {vg[n].index for n in ("body", "helper-l-eye", "helper-r-eye")}
    for v in body.data.vertices:
        if any(g.group in idx and g.weight > 0.5 for g in v.groups):
            keep.add([v.index], 1.0, 'REPLACE')
    for m in body.modifiers:
        if m.type == 'MASK': m.vertex_group = "render"
    rig = HumanService.add_builtin_rig(body, "default")
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.mode_set(mode='POSE')
    pb = rig.pose.bones
    V = mathutils.Vector
    def turn(name, R3):
        """Rotate a pose bone about its head by a 3x3 rotation (armature space; the rig sits at identity)."""
        b = pb[name]; M = b.matrix.copy(); h = M.translation.copy()
        b.matrix = mathutils.Matrix.Translation(h) @ R3.to_4x4() @ mathutils.Matrix.Translation(-h) @ M
        bpy.context.view_layer.update()
    def aim(first, last, target):
        """Turn bone `first` so the chain first.head -> last.tail points along target."""
        cur = pb[last].tail - pb[first].head
        turn(first, cur.rotation_difference(target.normalized()).to_matrix())
    def twist(name, deg):
        b = pb[name]; ax = (b.tail - b.head).normalized()
        turn(name, mathutils.Matrix.Rotation(math.radians(deg), 3, ax))
    for s, sg in (("L", 1), ("R", -1)):
        a = math.radians(arm_out)
        down = V((sg * math.sin(a), 0, -math.cos(a)))
        aim(f"upperarm01.{s}", f"upperarm02.{s}", down)
        aim(f"lowerarm01.{s}", f"lowerarm02.{s}", down)
        aim(f"wrist.{s}", f"wrist.{s}", down)
        twist(f"lowerarm01.{s}", -sg * supinate / 2)
        twist(f"lowerarm02.{s}", -sg * supinate / 2)
        l = math.radians(leg_out)
        aim(f"upperleg01.{s}", f"upperleg02.{s}" if f"upperleg02.{s}" in pb else f"upperleg01.{s}", V((sg * math.sin(l), 0, -math.cos(l))))
    bpy.ops.object.mode_set(mode='OBJECT')
    return body, rig

def bbox(o):
    dg = bpy.context.evaluated_depsgraph_get()
    e = o.evaluated_get(dg)
    vs = [e.matrix_world @ v.co for v in e.data.vertices]
    return [min(v[i] for v in vs) for i in range(3)], [max(v[i] for v in vs) for i in range(3)]
