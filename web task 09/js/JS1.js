  function getStyle(obj, attr) {
  	if (obj.currentStyle) {
  		return obj.currentStyle[attr];
  	} else {
  		return getComputedStyle(obj, null)[attr];
  	}
  }

  function animate(obj, json, callback) {
  	clearInterval(obj.timer);
  	obj.timer = setInterval(function () {
  		var flag = true;
  		for (var attr in json) {
  			(function (attr) {
  				if (attr == "opacity") {
  					var now = parseInt(getStyle(obj, attr) * 100);
  					var dest = json[attr] * 100;
  				} else {
  					var now = parseInt(getStyle(obj, attr));
  					var dest = json[attr];
  				}
  				var speed = (dest - now) / 6;
  				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
  				if (now != dest) {
  					flag = false;
  					if (attr == "opacity") {
  						obj.style[attr] = (now + speed) / 100;
  					} else {
  						obj.style[attr] = now + speed + "px";
  					}
  				}
  			})(attr);
  		}
  		if (flag) {
  			clearInterval(obj.timer);
  			callback && callback();
  		}
  	}, 30);
  }