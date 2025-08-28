//Scipt that starts a loading screen, and ends when all images have loaded or failed to load

Promise.all(Array.from(document.images).map(img => {
    StartLoading();
    if (img.complete)
        return Promise.resolve(img.naturalHeight !== 0);
    return new Promise(resolve => {
        img.addEventListener('load', () => resolve(true));
        img.addEventListener('error', () => resolve(false));
    });
})).then(results => {
    if (results.every(res => res))
        console.log('all images loaded successfully');
    else
        console.log('some images failed to load, all finished loading');
    StopLoading();
});

function StartLoading(){
    //spawn a loading screen
      currentPopUp.getElementsByClassName("loadingScreenPopUp")[0].style.opacity = "1";

}

function StopLoading(){
    //remove the loading screen
      currentPopUp.getElementsByClassName("loadingScreenPopUp")[0].style.opacity = "1";
}