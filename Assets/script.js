var timeBlockContainer = $("#timeBlockContainer");
// var timeBlockArray = [newTimeBlockHour,newTimeBlocTask,newTimeBlocAction];


for (let i = 9; i <= 17; i++) {
    if (i<10){seq = '0'+i} else {seq = i}
    // if (i<12)(dauOrNoon = 'am')

    var newTimeBlockDiv = $('<div class="row m-0">')
    var newTimeBlockHour = $('<div class="col-1 form-control" data-seq="'+ seq +'">'+ seq + ':00' +'</div>');
    var newTimeBlocTask = $('<div class="col-10 form-control" ><p id="task_'+ seq +'" contenteditable="true">Task</p></div>');
    var newTimeBlocAction = $('<div class="col-1 form-control">Save</div>');
    // var newTimeBlocAction = $('<div class="col-1 form-control">Save</div>');

    var timeBlockArray = [newTimeBlockHour,newTimeBlocTask,newTimeBlocAction];

    $.each(timeBlockArray, function(index){
        newTimeBlockDiv.append(timeBlockArray[index]);
    });

    timeBlockContainer.append(newTimeBlockDiv);
        
} 