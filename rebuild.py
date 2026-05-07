#!/usr/bin/env python3
import json, gzip, base64, re

def encode_file(path):
    with open(path, 'rb') as f:
        data = f.read()
    compressed = gzip.compress(data)
    b64 = base64.b64encode(compressed).decode('ascii')
    return {
        'mime': 'text/javascript',
        'compressed': True,
        'data': b64
    }

with open('index_orig.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract manifest
m = re.search(r'<script type="__bundler/manifest">(.*?)</script>', html, re.DOTALL)
manifest = json.loads(m.group(1))

# Update app root
manifest['a68a52d6-4446-47af-8338-eafc8e72fb2a'] = encode_file('decoded_a68a52d6.js')

# Update myroom
manifest['myroom00-0000-0000-0000-000000000000'] = encode_file('decoded_myroom.js')

# Update landing page
manifest['193d1f38-f427-44f2-9c56-0fa162d7a31a'] = encode_file('decoded_193d1f38.js')

manifest_json = json.dumps(manifest, separators=(',', ':')).replace('</', '<\\/')

# Extract template
t = re.search(r'<script type="__bundler/template">(.*?)</script>', html, re.DOTALL)
template = json.loads(t.group(1))

myroom_uuid = 'myroom00-0000-0000-0000-000000000000'
if myroom_uuid not in template:
    # inject myroom script tag BEFORE a68a52d6 so it loads first
    template = template.replace(
        '<script type="text/babel" src="a68a52d6-4446-47af-8338-eafc8e72fb2a">',
        f'<script type="text/babel" src="{myroom_uuid}"></script>\n<script type="text/babel" src="a68a52d6-4446-47af-8338-eafc8e72fb2a">'
    )

template_json = json.dumps(template, separators=(',', ':')).replace('</', '<\\/')

# Replace in html
new_html = re.sub(
    r'<script type="__bundler/manifest">.*?</script>',
    lambda m: f'<script type="__bundler/manifest">{manifest_json}</script>',
    html, flags=re.DOTALL
)
new_html = re.sub(
    r'<script type="__bundler/template">.*?</script>',
    lambda m: f'<script type="__bundler/template">{template_json}</script>',
    new_html, flags=re.DOTALL
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('Done. index.html rebuilt.')
