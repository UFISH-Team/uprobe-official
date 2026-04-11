import os
import re
import glob

def fix_code_blocks(content):
    # Fix the broken code blocks that look like this:
    # ```yaml
    # align_index:
    # - bowtie2
    # - blast
    #
    # ```### Optional Fields
    
    # Use a regex to find code blocks that don't have a newline before the closing ```
    # and might have text immediately following the closing ```
    
    # First, let's fix the indentation issue where the code content is not properly indented
    # or the closing ``` is attached to the next heading
    
    def repl(match):
        lang = match.group(1)
        code = match.group(2)
        after = match.group(3)
        
        # Ensure proper newlines
        return f"```{lang}\n{code}\n```\n\n{after}"
        
    # Find ```lang ... ```something
    content = re.sub(r'```(\w+)\n(.*?)\n\s*```([^\n]+)', repl, content, flags=re.DOTALL)
    
    # Also fix cases where ``` is followed immediately by a heading on the same line
    content = re.sub(r'```(#+.*)', r'```\n\n\1', content)
    
    # Fix cases where the closing ``` is missing a newline before it
    content = re.sub(r'([^\n])\s*```\n', r'\1\n```\n', content)
    
    return content

for md_file in glob.glob('docs/docs/*.md'):
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    fixed_content = fix_code_blocks(content)
    
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

print("Code blocks fixed!")