import fs from 'fs';
const USER = '7811688';
const headers = { 'Client':'web','Client-Country':'US','Accept':'application/json' };
let cursor=null, all=[], page=0, total=Infinity, prevFirst=null;
const seenIds=new Set();
while (all.length < total) {
  const url=new URL(`https://api.mubi.com/v3/users/${USER}/ratings`);
  url.searchParams.set('per_page','100');
  if(cursor!=null) url.searchParams.set('cursor', cursor);
  const res=await fetch(url,{headers, cache:'no-store'});
  if(!res.ok){console.error('HTTP',res.status);break;}
  const data=await res.json();
  const meta=data.meta||{}; total=meta.total_count??total;
  const firstId=data.ratings[0]?.id;
  if(firstId===prevFirst){ console.log('cursor not advancing, stop'); break; }
  prevFirst=firstId;
  let added=0;
  for(const r of data.ratings){ if(!seenIds.has(r.id)){seenIds.add(r.id);all.push(r);added++;} }
  page++;
  console.log(`page ${page}: +${added} (total ${all.length}/${total}) oldest_on_page=${data.ratings.at(-1)?.created_at}`);
  const next=meta.next_cursor;
  if(!next||added===0||data.ratings.length===0) break;
  cursor=next;
}
fs.writeFileSync('new-films.json', JSON.stringify({ratings:all},null,2));
console.log(`Saved ${all.length} ratings`);
