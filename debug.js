/**
 * @author season.chen
 * @version 0.0.1
 */

+function() {
	var $box = document.createElement('div'),
		$ctrl = document.createElement('div'),
		$clear = document.createElement('div'),
		$con = document.createElement('div'),
		$body = document.documentElement,
		$head = document.getElementsByTagName('head')[0],
		show = false;

	function init() {
		$box.className = 'sdebug';
		$body.appendChild($box);

		$ctrl.className = 'sdebug-ctrl';
		$ctrl.innerHTML = 'D';
		$box.appendChild($ctrl);

		$clear.className = 'sdebug-clear';
		$clear.innerHTML = 'C';
		$con.appendChild($clear);

		$con.className = 'sdebug-con';
		$box.appendChild($con);

		$ctrl.addEventListener('click', function() {
			if (show) {
				show = false;
				$box.className = 'sdebug';
			} else {
				show = true;
				$box.className = 'sdebug sdebug-show';
			}
		});

		$clear.addEventListener('click', function() {
			$con.innerHTML = '';
		});

		window.console = window.console || {};

		window.console.log_origin = window.console.log;
		window.console.log = function(msg) {
			window.console.log_origin && 
			window.console.log_origin.apply(this, arguments);
			log(msg, 'log');
		}

		window.console.info_origin = window.console.info;
		window.console.info = function(msg) {
			window.console.info_origin && 
			window.console.info_origin.apply(this, arguments);
			log(msg, 'info');
		}

		window.console.warn_origin = window.console.warn;
		window.console.warn = function(msg) {
			window.console.warn_origin && 
			window.console.warn_origin.apply(this, arguments);
			log(msg, 'warn');
		}

		window.console.error_origin = window.console.error;
		window.console.error = function(msg) {
			window.console.error_origin && 
			window.console.error_origin.apply(this, arguments);
			log(msg, 'error');
		}

		window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) { 
			var info = {};
			info.errorMessage = errorMessage;
			info.scriptURI = scriptURI;
			info.lineNumber = lineNumber;
			info.columnNumber = columnNumber;
			try {
				info.errorObj = errorObj.toString();
			} catch (e) {

			}
			console.error(JSON.stringify(info, null, '    '));
		}

		createStyle();
	}

	function log(msg, type) {
		var $pre = document.createElement('pre');
		$pre.className = 'sdebug-pre ' + 'sdebug-' + type;
		$pre.innerHTML = msg;
		if ($con.childNodes.length) {
			$con.insertBefore($pre, $con.childNodes[0]);
		} else {
			$con.appendChild($pre);
		}		
	}

	function createStyle() {
		var $style = document.createElement('style'),
			css = '.sdebug,.sdebug *,.sdebug *:before,.sdebug *:after{padding: 0; margin: 0; box-sizing: border-box;}.sdebug{position: fixed; width: 100%; height: 0; left: 0; top: 0; font-size: 12px; font-family: "Microsoft Yahei"; line-height: 1.5; z-index: 999999;}.sdebug-ctrl{position: absolute; width: 20px; height: 20px; text-align: center; line-height: 20px; left: 0; top: 0; z-index: 2; background: green; border-radius: 50px; color: #fff; cursor: pointer;}.sdebug-clear{position: absolute; width: 20px; height: 20px; text-align: center; line-height: 20px; right: 0; top: 0; z-index: 2; background: #ddd; border-radius: 50px; color: #fff; cursor: pointer;}.sdebug-con{position: absolute; left: 0; right: 0; top: 0; bottom: 0; padding: 20px; display: none; background: #000; overflow: auto; z-index: 1;}.sdebug-show{height: 100%;}.sdebug-show .sdebug-con{display: block;}.sdebug-pre{padding: 5px 0; color: #fff; border-bottom: 1px solid #ddd; white-space: pre-wrap;}.sdebug-log{color: #fff;}.sdebug-info{color: #3F7C3F;}.sdebug-warn{color: #E69842;}.sdebug-error{color: #C11142;}';

		if($style.styleSheet){       
			$style.styleSheet.cssText = css;  
		} else {  
			$style.innerHTML = css;      
		}  

		$head.appendChild($style);
	}

	init();		
}();
