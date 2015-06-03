/*

OBJECTIVE: TASK BOARD

Ability to create Boards containing
1. Board Name
2. Task array in which tasks go into

Append Board onto DOM
1. Board is 3 nested divs with appropriate Card classes
2. Append the "Create Task" div onto the most inner div.
3. Append inner most div to the next most outer until you get to the 3rd div
4. Append it main board.

Create tasks containing
1. Task Name
2. Task Description

Append tasks to task board.
1. Task is 3 nested divs with appropriate Card classes
2. Append inner most div to the next most outer until you get to the 3rd div
3. Append it row div of the task board.


MAX BOARDS = 4
 */

var consilium = angular.module('consilium', []);

consilium.controller('BoardController', ['$scope', function($scope, title){
	$scope.boards = [


			[{'title': 'Test Board',
			'tasks': [
				{'taskTitle' : 'Task Test Title',
					'taskDesc' : 'Task Test Desc'},
				{'taskTitle' : 'Another Test Task Title',
					'taskDesc' : 'Another Test Desc'}
				]
			}],
			[{'title': 'Test Board 2',
				'tasks': [
					{'taskTitle' : 'Task Test Title 2',
						'taskDesc' : 'Task Test Desc'},
					{'taskTitle' : 'Another Test Task Title 2',
						'taskDesc' : 'Another Test Desc'}
				]
			}]


		];

	$scope.list1 = $scope.boards[0];
	$scope.list2 = $scope.boards[1];
	$scope.list3 = $scope.boards[2];
	$scope.list4 = $scope.boards[3];


	if($scope.boards.length >= 4){

	}
	$scope.addBoard = function() {

		$scope.boards.push({
			title: $scope.boardTitle
		});

		// Clear input fields
		$scope.boardTitle = '';
	};

	$scope.removeBoard = function(board) {

	};

	$scope.addTask = function(title, task) {

		// Iterate through board indexes to find proper board by comparing titles
		for(var i = 0; i < $scope.boards.length; i++){
			if($scope.boards[i].title == title){
				// Check to see if array exists, if not then create the array
				if(typeof $scope.boards[i].tasks == 'undefined'){
					$scope.boards[i].tasks = [];
				}
				$scope.boards[i].tasks.push({
					'taskTitle' : task.taskTitle,
					'taskDesc' : task.taskDesc
				});
			}
		}
		// Clear input fields
		task.taskTitle = '';
		task.taskDesc = '';

	}

}]);

var board_num = 4;

var board_classes = [
	'col s3 m3',
	'card teal lighten-1 z-depth-3 center-align board',
	'card-content white-text',
	'card-title'
];

var task_classes = [
	'col s12 m12',
	'card light-blue lighten-1 z-depth-1 center-align',
	'card-content white-text'
];

// OBJECTS
var board = {

	createDivs: function(div_array, div_classes){
		var i;
		for(i = 0; i < 3; i++){
			div_array[i] = document.createElement('div');
			div_array[i].className = div_classes[i];
		}
	},

	createBoard: function(){
		board_num--;
		console.log('create board');
		console.log(board_num);
		if (board_num >= 0) {
			// Board consists of 3 nested divs
			var board_divs = [];

			this.createDivs(board_divs, board_classes);

			// Attaching appropriate classes to each div
			board_divs[0].appendChild(board_divs[1]);
			board_divs[1].appendChild(board_divs[2]);

			// Create Board Title and attach to DOM
			var title = document.getElementById('board_name').value;
			var board_title = document.createElement('span');
			board_divs[2].setAttribute('data', 'parent');
			board_divs[2].id = title;
			board_title.className = board_classes[3];
			board_title.textContent = title;
			// Add Title to Board
			board_divs[2].appendChild(board_title);
			document.getElementById('task_board').insertBefore(board_divs[0], document.getElementById('create_board_div'));

			// Create the "Create Task" div
			var task_divs = [];
			this.createDivs(task_divs,task_classes);

			// Create the "Create Task" button
			task_divs[3] = document.createElement('span');
			task_divs[3].textContent = 'Create Task';
			task_divs[4] = document.createElement('div');
			task_divs[5] = document.createElement('button');
			task_divs[5].setAttribute('onclick','openCreateTask()');
			task_divs[5].className = 'btn-floating waves-effect waves-light modal-trigger mdi-content-add';


			task_divs[0].appendChild(task_divs[1]);
			task_divs[1].appendChild(task_divs[2]);
			task_divs[2].appendChild(task_divs[3]);
			task_divs[3].appendChild(task_divs[4]);
			task_divs[4].appendChild(task_divs[5]);
			document.getElementById(title).appendChild(task_divs[0]);
			return title;
		}

		// Disables "Add Board" feature
		if(board_num <= 0){
			document.getElementById('create_board_div').style.visibility = 'hidden';
		}

		console.log(board_num);
	},


	task: function (title, desc) {
		this.title = title;
		this.desc = desc;
	},


	createTask: function(id){
		var task_divs = [];
		var title = document.getElementById('task_name');
		var desc = document.getElementById('task_desc');
		var new_task = this.task(title, desc);
		var taskBoard = findParent('div', id);

		this.createDivs(task_divs, task_classes);

		task_divs[0] = document.createElement('span');
		task_divs[0].textContent = title;
		task_divs[1] = document.createElement('p');
		task_divs[2] = document.createElement('but');
		task_divs[2].setAttribute('onclick','openCreateTask()');
		task_divs[2].className = 'btn-floating waves-effect waves-light modal-trigger mdi-content-add';

		taskBoard.appendChild(new_task);
	}
};

// FUNCTIONS



function findParent(el, id){
	while(el.parentNode) {
		el = el.parentNode;
		if(el.id(id))
			return el;
	}
	return null;
}


function openCreateTask(){
	$('#create-task').openModal();
}

$(document).on('click', '.modal-trigger', function() {
	var idTest = $(this).data('id');
	$('.input-field #board_name').val(idTest);
});