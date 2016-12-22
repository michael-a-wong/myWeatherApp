var view = {
	
	
	"makeView": function(data){
		var quotes = ["It's sunny. Time to break out those shorts", "It's raining, don't forget your umbrella.", "It's cloudy, maybe you should bring a light jacket."]
		var todayBlock = document.getElementById("today");
		var dataDay =data.query.results.channel.item.forecast; 
		var location = data.query.results.channel.location; 
		var todayData = dataDay[0];
	
		var titleDiv = document.createElement("DIV");
		titleDiv.id = "titleDiv";
		titleDiv.appendChild(document.createTextNode(location.city + ", " + location.region + " "));
	
	
		var leftDiv = document.createElement("DIV");
		leftDiv.id = "leftDiv"; 
		var imageDiv = document.createElement("DIV");
		var img = document.createElement("IMG");
		imageDiv.appendChild(img); 
		imageDiv.class = "todayImage"; 
		img.src = codeToImage(todayData.code); 
		leftDiv.appendChild(imageDiv); 
	
		var rightDiv = document.createElement("DIV");
		rightDiv.id = "rightDiv"; 
	
		var todayDiv = document.createElement("DIV");
		todayDiv.appendChild(document.createTextNode("Today "));
		todayDiv.appendChild(document.createElement("br"));
		createToday(todayDiv, todayData); 
		todayDiv.id = "rightText"; 
		rightDiv.appendChild(todayDiv); 
	
		var todayTempInfoDiv = document.createElement("DIV");
		var mainTemp = document.createElement("DIV"); 
		mainTemp.className = "mainTemp"; 
		var temp = data.query.results.channel.item.condition.temp;
		mainTemp.appendChild(document.createTextNode( " " + temp + "° F"));
		todayTempInfoDiv.appendChild(mainTemp); 
		todayTempInfoDiv.appendChild(document.createElement("br"));
		todayTempInfoDiv.appendChild(document.createTextNode( "Hign " + todayData.high + "°/Low " + todayData.low + "°"));
		todayTempInfoDiv.id = "rightText"; 
		rightDiv.appendChild(todayTempInfoDiv); 
	
		var quote = document.createElement("DIV");
		quote.appendChild(document.createTextNode( quotes[codeToIndex(todayData.code)]));
		quote.id = "rightText"; 
		rightDiv.appendChild(quote);
	
		todayBlock.appendChild(titleDiv); 
		todayBlock.appendChild(leftDiv); 
		todayBlock.appendChild(rightDiv); 
	
		var weekBlock = document.getElementById("week");
		var weekCount = 1; 

		for (var i = 0; i < weekBlock.childNodes.length; i++){
			if (weekBlock.childNodes[i].className == "day") {
				var weekDay = document.createElement("DIV");
				weekDay.className = "weekDay"; 
				createToday(weekDay, dataDay[weekCount]);
				weekBlock.childNodes[i].appendChild(weekDay);
			
				var imgWeekDiv = document.createElement("DIV");
				var imgWeek = document.createElement("IMG");
			imgWeekDiv.appendChild(imgWeek);
				imgWeekDiv.className = "weekDayPicDiv"; 
				imgWeek.src = codeToImage(dataDay[weekCount].code); 
				imgWeek.id = "weekImage";
				imgWeek.className = "weekDayPic"; 
				weekBlock.childNodes[i].appendChild(imgWeekDiv);
			
				var weekTemp = document.createElement("DIV");
				weekTemp.className = "weekDayTemp"; 
				weekTemp.appendChild(document.createTextNode( " " + dataDay[weekCount].high + "° F"));
				weekBlock.childNodes[i].appendChild(weekTemp);
				weekCount++; 
			}
		}
	
		function codeToImage(code) {
			if ( (code > 30 && code < 35) || code == 36 ) 
				return "sunny.svg"; 
			if (code < 13 || code == 37 || code == 38 || code == 39 || code == 40 || code == 45 || code == 47 )
				return "Rainy.svg";
			return "Cloudy.svg"; 
		}
		
		function codeToIndex(code) {
			if ( (code > 30 && code < 35) || code == 36 ) 
				return 0; 
			if (code < 13 || code == 37 || code == 38 || code == 39 || code == 40 || code == 45 || code == 47 )
				return 1;
			return 2; 
		}

		function createToday(element, data) {
			var textDay = document.createElement("DIV");
			var textDate = document.createElement("DIV");
			textDay.className = "textDay"; 
			textDate.className = "textDate"; 

			textDay.appendChild(document.createTextNode(getDay(data.day))); 
			textDate.appendChild(document.createTextNode(formatDate(data.date)));

			element.appendChild(textDay);
			// element.appendChild(document.createElement("br"));
			element.appendChild(textDate);
		}

		function getDay(day){
			if (day == "Mon")
				return "MONDAY";
			if (day == "Tue")
				return "TUESDAY"; 
			if (day == "Wed")
				return "WEDNESDAY"; 
			if (day == "Thu")
				return "THURSDAY"; 
			if (day == "Fri")
				return "FRIDAY"; 
			if (day == "Sat")
				return "SATURDAY"; 
			if (day == "Sun")
				return "SUNDAY"; 
		}

		function formatDate(date) {
			var res = date.split(" ");
			var month; 
			if (res[1] == "Jan")
				month = "January"; 
			else if (res[1] == "Feb")
				month = "February"; 
			else if (res[1] == "Mar")
				month = "March"; 
			else if (res[1] == "Apr")
				month = "April"; 
			else if (res[1] == "May")
				month = "May"; 
			else if (res[1] == "Jun")
				month = "June"; 
			else if (res[1] == "Jul")
				month = "July"; 
			else if (res[1] == "Aug")
				month = "August"; 
			else if (res[1] == "Sep")
				month = "September"; 
			else if (res[1] == "Oct")
				month = "October"; 
			else if (res[1] == "Nov")
				month = "November"; 
			else if (res[1] == "Dec")
				month = "December"; 


			return month + " " + res[0] + ", " + res[2]; 
		}
	},
	
	"makeWoeid": function(){
	
		var searchText = document.getElementById("zip").value;
		var scriptText = document.createElement('script');


		var todayDiv = document.getElementById("today"); 
		while (todayDiv.firstChild) 
		{
			todayDiv.removeChild(todayDiv.firstChild);
		}

		for (var i = 1; i < 6; i++)
		{
			var weekDiv = document.getElementById("day" + i); 
			while (weekDiv.firstChild) 
			{
				weekDiv.removeChild(weekDiv.firstChild);
			}
		}

		scriptText.src = "https://query.yahooapis.com/v1/public/yql?q=select woeid,name,admin1,country  from   geo.places where text='" +searchText+"' & format=json & callback=placeCallback"; 
		document.body.appendChild(scriptText); 
	
	},
	
	"passData": function(data) {
		if (data.query.results == null) {
			var woeid = "not found";
			var name = "not found";
		} // was it unique? 
		else {
			if (data.query.results.place[0] == undefined) {
				place = data.query.results.place;
			} // multiple ones - pick the first one
			else {
			place = data.query.results.place[0];
			}

			var woeid = place.woeid;

			//console.log(woeid); 
			var script = document.createElement('script');
			script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid ="+woeid+"&format=json&callback=callbackFunction ";
			document.body.appendChild(script);
		}
	}
}; 

