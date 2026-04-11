import os
import re
import glob

def fix_markdown(content):
    # Fix broken code blocks like:
    # ````bash
    # pip install uprobe
    #
    # ````
    content = re.sub(r'````(\w+)\n(.*?)\n````', r'```\1\n\2\n```', content, flags=re.DOTALL)
    
    # Fix options (.. option:: --version)
    content = re.sub(r'\.\. option:: (.*)', r'### `\1`', content)
    
    # Fix note admonitions that didn't get caught
    content = re.sub(r'\.\. note::\s*(.*?)(?=\n\n[^\s]|\Z)', r'::: info Note\n\1\n:::', content, flags=re.DOTALL)
    
    # Fix tip admonitions
    content = re.sub(r'\.\. tip::\s*(.*?)(?=\n\n[^\s]|\Z)', r'::: tip Tip\n\1\n:::', content, flags=re.DOTALL)
    
    # Fix list-table
    content = re.sub(r'\.\. list-table::.*?\n\n((?:(?: {3}|\t).*?\n|\n)*)', r'', content)

    # Fix images with target and alt
    def repl_image(m):
        img_url = m.group(1)
        target = m.group(2) if m.group(2) else ""
        alt = m.group(3) if m.group(3) else "image"
        
        target = target.strip()
        alt = alt.strip()
        
        if target:
            return f"[![{alt}]({img_url})]({target})"
        else:
            return f"![{alt}]({img_url})"
            
    content = re.sub(r'\.\. image:: ([^\n]+)(?:\n\s+:target: ([^\n]+))?(?:\n\s+:alt: ([^\n]+))?', repl_image, content)
    
    # Fix literal includes (if any) or other directives
    content = re.sub(r'\.\. literalinclude::.*', r'', content)
    
    # Fix inline code that might have been missed
    content = re.sub(r'``([^`\n]+)``', r'`\1`', content)
    
    # Remove Sphinx indices
    content = re.sub(r'\* :ref:`.*`\n?', '', content)
    content = re.sub(r'# Indices and tables\n*', '', content)
    
    return content

for md_file in glob.glob('docs/docs/*.md'):
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    fixed_content = fix_markdown(content)
    
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

print("Markdown files fixed!")
