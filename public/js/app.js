const weatherForm = document.querySelector('form');

const search = document.querySelector('input');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Testing');
    console.log(search.value)
    if(!search.value){
         console.log('Please enter location')
         return
    }
    const message1 = document.querySelector('#message1');
    const message2 = document.querySelector('#message2');
    message1.textContent = 'Loading';
    message2.textContent = '';
    
    fetch('/weather?address='+search.value).then( (response) => {
    response.json().then((data) => {
       if(data.error) {
            console.log(data.error);
            message1.textContent = data.error;
        } else {
            console.log(data.address);
            console.log(data.forecast);
            message1.textContent = data.address;
            message2.textContent = data.forecast;
        }
    }

    )
})
})

