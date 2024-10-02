const loadCatagory = ()=>{

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json() )
    .then(data => displayCatagories(data.categories))
    .catch((error) => console.log(error))

}
const displayCatagories= (catagories) =>{
    const catContainer = document.getElementById('category')
  catagories.forEach(element => {
    const btnContainer = document.createElement("div");
btnContainer.innerHTML = `<button class='btn' onclick ="loadCatagoryVideos(${element.category_id})">${element.category} </button>`    
    catContainer.append(btnContainer)
  });
}

const loadVideos = ()=>{

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json() )
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error))

}

function getTimeString(time){
    const hour =parseInt( time/3600);
    let remainingS = time%3600;
    const min = parseInt (remainingS/60);
     remainingS = remainingS%60;
     return `${hour} hrs ${min} min ${remainingS} s ago`

}



const displayVideos= (videos)=>{
    const vdoContainer = document.getElementById('ved');
    vdoContainer.innerHTML="";
     
    if(videos.length === 0){
        vdoContainer.classList.remove('grid')
        vdoContainer.innerHTML=`<div class='h-[500px] flex flex-col gap-5 justify-center items-center'> 
        <img src="./assest/Icon.png" />
        <h2 class="text-center text-xl font-bold"> No Content here in this Category </h2>
        </div>`;
        return 
    }else{
        vdoContainer.classList.add('grid')
    }



    videos.forEach(vdo => {
        console.log(vdo);
       const card = document.createElement('div');
       card.classList = 'card card-compact';
       card.innerHTML =` 
    <figure class="h-[300px] relative">
    <img
      src=${vdo.thumbnail} class="h-full w-full object-cover"
      alt="Shoes" />
      ${vdo.others.posted_date?.length == 0 ? "" : 
`<span class="absolute right-2 bottom-2 text-xs bg-black rounded p-1 text-white">${ getTimeString(vdo.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-4">
   <div> <img class = "w-10 h-10 rounded-full object-cover " src=${vdo.authors[0].profile_picture} /> </div>
  <div>
   <h2 class="font-bold">${vdo.title}</h2>
   <div class="flex items-center gap-4"> 
     <p class="text-gray-400">${vdo.authors[0].profile_name}</P>
     ${vdo.authors[0].verified === true ?'<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>':''}
 
</div>
   </div>
  </div>`
  vdoContainer.append(card);
      });
      
}

const loadCatagoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json() )
    .then(data => displayVideos(data.category))
    .catch((error) => console.log(error))
}





 loadCatagory();
 loadVideos();