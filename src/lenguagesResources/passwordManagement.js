import shell from './shell';

export default {
	eng: {
		title: shell.eng.passwordChange,
		header: 'For security reasons please enter your old password and confirm new one',
		oldPassword: 'Old password',
		password: 'Password',
		confirmPassword: 'Confirm password',
		login: 'Login',
		oldPasswordRequired: 'Old password is required',
		passwordRequired: 'Password is required',
		confirmPasswordRule: 'Password confirmation don\'t match',
		'MESSAGES.REQUEST_SUCCESS_PASSWORD_CHANGED': 'Password changed successfully',
		'MESSAGE.ERROR_USER_NOT_VALID': 'Error changing password'
	},
	esp: {
		title: shell.esp.passwordChange,
		header: 'Por razones de seguridad por favor introduce tu contraseña anterior y confirma la nueva',
		oldPassword: 'Contraseña anterior',
		password: 'Contraseña',
		confirmPassword: 'Confirmar contraseña',
		login: 'Entrar',
		oldPasswordRequired: 'Contraseña anterior es requerida',
		passwordRequired: 'Contraseña es requerida',
		confirmPasswordRule: 'Confirmación de contraseña no coincide',
		'MESSAGES.REQUEST_SUCCESS_PASSWORD_CHANGED': 'Contraseña actualizada correctamente',
		'MESSAGE.ERROR_USER_NOT_VALID': 'Error al cambiar contraseña'
	}
};
