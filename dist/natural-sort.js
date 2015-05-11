(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define('naturalSort', ['exports'], factory) : factory(global.naturalSort = {});
})(this, function (exports) {
	'use strict';

	var CHAR_CODE_ZERO = '0'.charCodeAt(0);

	var CHAR_CODE_NINE = '9'.charCodeAt(0);

	var CHAR_CODE_POINT = '.'.charCodeAt(0);

	/**
  * check if the char is [.0-9]
  * @param char {String}
  * @returns {boolean}
  */
	function charCodeHelper__contains(char) {
		var code = char && char.charCodeAt(0);

		return code === CHAR_CODE_POINT || code >= CHAR_CODE_ZERO && code <= CHAR_CODE_NINE;
	}

	function naturalSort(list) {
		var caseInsensitive = arguments[1] === undefined ? true : arguments[1];
		var order = arguments[2] === undefined ? 'DESC' : arguments[2];

		var desc = order.toUpperCase() === 'DESC';

		list.forEach(function (item, i) {
			return list[i] = splitByCharType(item);
		});

		list.sort(function (a, b) {
			return sort(a, b, caseInsensitive, desc);
		});

		list.forEach(function (item, i) {
			return list[i] = item.join('');
		});

		return list;
	}

	/**
  * convert string to array by its type
  * such as : 'a10b20' to ['a', '10', 'b', '20']
  * @param str {String}
  * @return {Array}
  */
	function splitByCharType(str) {
		if (typeof str !== 'string') str = String(str);

		if (str === '') return [];

		var list = [str[0]];
		var lastCharType = charCodeHelper__contains(str[0]);

		for (var i = 1; i < str.length; i += 1) {
			var singleChar = str[i];
			var charType = charCodeHelper__contains(singleChar);

			if (charType === lastCharType) {
				list[list.length - 1] += singleChar;
			} else {
				list.push(singleChar);

				lastCharType = charType;
			}
		}

		return list;
	}

	/**
  * sort the transformed array
  * @param a {Array}
  * @param b {Array}
  * @param caseInsensitive
  * @param desc
  * @returns {number}
  */
	function sort(a, b, caseInsensitive, desc) {
		var len = Math.min(a.length, b.length);
		var factor = desc ? -1 : 1;

		for (var i = 0; i < len; i += 1) {
			var itemA = a[i];
			var itemB = b[i];

			if (caseInsensitive) {
				itemA = itemA.toLowerCase();
				itemB = itemB.toLowerCase();
			}

			if (itemA !== itemB) {
				var valueA = Number(itemA);
				var valueB = Number(itemB);

				if (valueA == itemA && valueB == itemB) {
					return (valueA - valueB) * factor;
				} else {
					return itemA > itemB ? 1 * factor : -1 * factor;
				}
			}
		}

		return (a.length - b.length) * factor;
	}

	exports.naturalSort = naturalSort;
});