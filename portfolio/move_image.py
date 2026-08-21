import os
import shutil

src = r'c:\Users\Lenovo\Desktop\portfolio\portfolio\online-learing-project.png'
dst = r'c:\Users\Lenovo\Desktop\portfolio\portfolio\assets\img\online-learning-project.png'

print(f'Source exists: {os.path.exists(src)}')
print(f'Destination exists before: {os.path.exists(dst)}')

if os.path.exists(src):
    shutil.copy2(src, dst)
    print(f'Copy successful: {os.path.exists(dst)}')
else:
    print('Source file not found!')