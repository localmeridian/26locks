# Print joint centres of the posed figure in the site's 400×1000 front-view coordinates.
import bpy, sys, os, json
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import body as B
from render import FIG_SCALE, FIG_CZ
body, rig = B.build()
top = FIG_CZ + FIG_SCALE / 2
def v(p): return [round(200 + p.x / FIG_SCALE * 1000, 1), round((top - p.z) / FIG_SCALE * 1000, 1)]
pb = rig.pose.bones
out = {n: v(rig.matrix_world @ pb[n].head) for n in pb.keys() if not n.endswith(".R")}
out["_tips"] = {n: v(rig.matrix_world @ pb[n].tail) for n in pb.keys() if n.endswith(".L") and ("finger3-3" in n or "toe" in n)}
lo, hi = B.bbox(body); out["_bbox"] = [v(__import__('mathutils').Vector((lo[0],0,hi[2]))), v(__import__('mathutils').Vector((hi[0],0,lo[2])))]
json.dump(out, open(os.path.join(HERE, "out", "landmarks.json"), "w"), indent=0)
