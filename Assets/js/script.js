var message = $('.alert');
var timeBlockContainer = $("#timeBlockContainer");

$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

var hour = 14

var tasks = {
    '09': '',
    '10': '',
    '11': '',
    '12': '',
    '13': '',
    '14': '',
    '15': '',
    '16': '',
    '17': ''
}


// EXECTUTE FUNCTIONS
main();


// FUNTION DEFINITIONS 
function main() {

    createTimeBlocks();
    getTasks();
    
}


function createTimeBlocks() {

    // FOR loop to create the time blocks    
    for (let i = 9; i <= 17; i++) {
        if (i<10){seq = '0'+i} else {seq = i}
        
        // Definition of the variables that correponds to the elements for each time block 
        var newTimeBlockDiv = $('<form class="row"></form>')
        var newTimeBlockHour = $('<div class="hourDiv col-1"><p>'+ seq + ':00' +'</p></div>');
        var newTimeBlockTask = $('<textarea id="task_' + seq + '" class="taskDiv col-9" placeholder="Put your task here..."></textarea>');
        var newTimeBlockAction = $('<button class="saveBtn col-1" data-seq="'+ seq +'"><i class="fas fa-file-export"></i></button>');


        //Determines if the Time Block is past, present or future.
        var timeBlockArray = [newTimeBlockHour,newTimeBlockTask,newTimeBlockAction];

        if (seq < hour) {
            var tempClass = newTimeBlockTask.attr('class');
            newTimeBlockTask.attr('class', tempClass += ' past')
        } else if (seq == hour) {
            var tempClass = newTimeBlockTask.attr('class');
            newTimeBlockTask.attr('class', tempClass += ' present')
        } else {
            var tempClass = newTimeBlockTask.attr('class');
            newTimeBlockTask.attr('class', tempClass += ' future')
        }

        // Appends the HTML elements to the Time Block group
        $.each(timeBlockArray, function(index){
            newTimeBlockDiv.append(timeBlockArray[index]);
        });

        timeBlockContainer.append(newTimeBlockDiv);
            
    }
}


function getTasks() {

    if (JSON.parse(localStorage.getItem("tasks")) != null) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        
        $.each(tasks, function(key){
            idReference = '#task_'+key;
            $(idReference).val(tasks[key]);
            console.log(idReference)
        })

    };
    
}


timeBlockContainer.on('click', '.saveBtn', function (event){
    event.preventDefault();


    if ($(event.target).is(".saveBtn") || ($(event.target).is('i'))) {
        if ($(event.target).is(".saveBtn")) {var hourId = $(event.target).attr("data-seq");}
        if ($(event.target).is('i')) {var hourId = $(event.target).parent().attr("data-seq");}
        
        console.log(event.target);
        console.log('Button Clicked: ' + hourId);

        var idReference = '#task_' + hourId;
        tasks[hourId] = $(idReference).val();

        localStorage.setItem('tasks', JSON.stringify(tasks));

        message.fadeIn('fast');

        message.text('Task of ' + hourId + ':00 succesfully saved!!');

        answerTimer();

    }  

});




function answerTimer() {
    var answerSecondsLeft = 1;

    var answerTimerInterval = setInterval(function() {
        answerSecondsLeft--;
        
        if (answerSecondsLeft == 0) {
            clearInterval(answerTimerInterval);
            message.fadeOut("slow");
        }

    }, 750);    

}





