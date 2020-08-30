import glob
import shutil
import os
import re

## list directories
css_file = glob.glob("./vue-web/dist/css/*.css")[0]
js_file = glob.glob("./vue-web/dist/js/chunk*.js")[0]
app_js_file = glob.glob("./vue-web/dist/js/app*.js")[0]

## extract names
css_base = os.path.basename(css_file)
js_base = os.path.basename(js_file)
app_js_base = os.path.basename(app_js_file)


## copy files
shutil.copyfile(css_file, f"./kviz/static/kviz/css/{css_base}")
shutil.copyfile(js_file, f"./kviz/static/kviz/js/{js_base}")
shutil.copyfile(app_js_file, f"./kviz/static/kviz/js/{app_js_base}")

## replace text in vue.html
data = ""
reg_css = re.compile(r"(.+kviz/css/)(.+)('.+)")
reg_app_js = re.compile(r"(.+kviz/js/)(app.+)('.+)")
reg_js = re.compile(r"(.+kviz/js/)(chunk.+)('.+)")

with open("./kviz/templates/kviz/vue.html", "r") as fin:
    for line in fin:
        if reg_css.search(line):
            line = reg_css.sub(r"\1" + css_base + r"\3", line)
            # print(line)
        elif reg_app_js.search(line):
            line = reg_app_js.sub(r"\1" + app_js_base + r"\3", line)
            # print(line)
        elif reg_js.search(line):
            line = reg_js.sub(r"\1" + js_base + r"\3", line)
            # print(line)
        data += line

with open("./kviz/templates/kviz/vue-new.html", "w") as fout:
    fout.write(data)

os.remove("./kviz/templates/kviz/vue.html")
os.rename("./kviz/templates/kviz/vue-new.html", "./kviz/templates/kviz/vue.html")