/* eslint-disable no-useless-escape */
export default class CIUtils {
	static validateIdeaPassword = value => {
		const regex = /^[0-9a-zA-Z]{6,20}$/
		return regex.test(value)
	}

	static validateEnglish = value => {
		const regex = /^[0-9a-zA-Z]{1,20}$/
		return regex.test(value)
	}

	static validateEmail = email => {
		const regex =
			/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
		return regex.test(email)
	}

	static validateName = name => {
		const regex = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/
		return regex.test(name)
	}

	static validateNumber = number => {
		const regex = /^[0-9]{9,12}$/
		return regex.test(number)
	}

	static validatePassword = password => {
		const regex = /[0-9a-zA-Z]{1,}[^0-9a-zA-Z]{1,}/
		return regex.test(password)
	}

	static removeWhitespace = text => {
		const regex = /\s/g
		return text.replace(regex, '')
	}
}

export function numberWithCommas(x) {
    if (typeof x !== 'number' && typeof x !== 'string') return '0';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPhoneNumber(phoneNumber) {
	// 이미 하이픈이 있는 경우 그대로 반환
	if (phoneNumber?.includes('-')) {
	  return phoneNumber;
	}
  
	// 숫자만 있는 경우 하이픈 추가
	const cleaned = ('' + phoneNumber).replace(/\D/g, '');
	const match = cleaned?.match(/^(\d{3})(\d{4})(\d{4})$/);
  
	if (match) {
	  return `${match[1]}-${match[2]}-${match[3]}`;
	}
  
	return phoneNumber;
  }

export const convertBinaryToDays = (binaryString) => {
	const daysArray = ['월', '화', '수', '목', '금', '토', '일'];

	return binaryString
		?.split('')
		?.map((bit, index) => (bit === '1' ? daysArray[index] : ''))
		?.filter((day) => day !== '')
		.join(', ');
};

export const convertDaysToBinary = (selectedDays) => {
	const binaryArray = ['0', '0', '0', '0', '0', '0', '0'];
	selectedDays.forEach((day) => {
		switch (day) {
			case '월':
				binaryArray[0] = '1';
				break;
			case '화':
				binaryArray[1] = '1';
				break;
			case '수':
				binaryArray[2] = '1';
				break;
			case '목':
				binaryArray[3] = '1';
				break;
			case '금':
				binaryArray[4] = '1';
				break;
			case '토':
				binaryArray[5] = '1';
				break;
			case '일':
				binaryArray[6] = '1';
				break;
			default:
				break;
		}
	});
	return binaryArray.join('');
};