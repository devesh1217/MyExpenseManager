let id,token;
const ch4 = new BroadcastChannel('ch4');
ch4.onmessage=(e=>{
    id=e.data.id;
    token=e.data.token;
    console.log(id,token)
})
console.log('hi SW')
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
async function save(sub){
    await fetch('/api/subscription/save',{
        method:'POST',
        body:JSON.stringify(sub),
        headers: {'Content-type':"application/json",'Authorization': `Bearer ${token}`}
    })
    .then(data=>data.json())
    .then(doc=>{
        console.log(doc)
    });
}

self.addEventListener("activate",async (e)=>{
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array('BNOGUi-eC2wjhs2_v78dkfp8IMriCQRuwnuAWGEMTNLrIPMvnYveaz7dcIno3q-1TQdmKFwO1fBRxpvstObVMec')
    })
    ans={userId:id,subscription}
    console.log(ans,JSON.stringify(ans))
    save(ans);
})

self.addEventListener('push',async (e)=>{
    let x = JSON.parse(e.data.text())
    self.registration.showNotification(x.title,{body:x.desc})
})