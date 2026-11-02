"""Check the redesign against the pre-redesign professional content inventory."""
from html.parser import HTMLParser
from html import unescape
from pathlib import Path
from collections import Counter
import json,re
ROOT=Path(__file__).resolve().parents[1]
inventory=json.loads((ROOT/'docs/content-inventory.json').read_text())
source=(ROOT/'index.html').read_text()
class Document(HTMLParser):
 def __init__(self):super().__init__();self.text=[];self.links=[];self.assets=[];self.ids=[]
 def handle_data(self,data):self.text.append(data)
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if attrs.get('id'):self.ids.append(attrs['id'])
  if tag=='a':self.links.append(attrs.get('href',''))
  for key in ('src','data-image'):
   if attrs.get(key):self.assets.append(attrs[key])
  if tag=='link' and attrs.get('href','').startswith('assets/'):self.assets.append(attrs['href'])
def norm(s):return ' '.join(unescape(s).split())
def text(s):p=Document();p.feed(s);return norm(' '.join(p.text))
p=Document();p.feed(source);rendered=text(source)
errors=[]
for group in ('education','experience','recommendations','credentials'):
 for item in inventory[group]:
  for key in ('title','subtitle','date'):
   if norm(item[key]) not in rendered:errors.append(f'Missing {group}: {key} {item[key]}')
  if text(item['body']) not in rendered:errors.append(f'Changed description: {item["title"]}')
for item in inventory['projects']:
 if norm(item['title']) not in rendered:errors.append('Missing project '+item['title'])
 if item['url'] not in p.links:errors.append('Missing project link '+item['url'])
 if item['lightbox'] not in p.assets:errors.append('Missing original project image '+item['lightbox'])
 expected='data-groups=\''+__import__('html').escape(json.dumps(item['groups']),quote=True)+'\''
 if expected not in source:errors.append('Changed project groups '+item['title'])
for item in inventory['skills']:
 if item['label'] not in rendered:errors.append('Missing skill '+item['label'])
 expected=f'aria-label="{item["label"]} self-assessed proficiency" aria-valuenow="{item["percent"]}"'
 if expected not in source:errors.append('Changed proficiency '+item['label'])
for href in inventory['links']:
 if href not in p.links and href not in p.assets:errors.append('Missing external or image link '+href)
if text(inventory['biography_html']) not in rendered:errors.append('Changed biography')
if text(inventory['personal_html']) not in rendered:errors.append('Changed personal information')
for label in inventory['capabilities']:
 if label not in rendered:errors.append('Missing capability '+label)
for asset in p.assets:
 if asset.startswith('assets/') and not (ROOT/asset).is_file():errors.append('Missing asset '+asset)
if len(p.ids)!=len(set(p.ids)):errors.append('Duplicate HTML IDs')
for anchor in p.links:
 if anchor.startswith('#') and anchor[1:] not in p.ids:errors.append('Broken anchor '+anchor)
print('Content preservation:', 'PASS' if not errors else 'FAIL')
print(f'Checked: {len(inventory["experience"])} roles, 11 projects and category assignments, 12 skill percentages, 2 qualifications, 6 full recommendations, 9 credentials/publications, biography, personal details, and original links.')
for error in errors:print(error)
raise SystemExit(bool(errors))
