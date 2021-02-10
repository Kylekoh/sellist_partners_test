export const serverAPI = "https://api.buzzikid.com/PartnersApi";

export const TOKEN = "6cz2w6BC9mgpAhKNmmgcSnpEnJX9w34mF3dzzMyAqzBYkBTfEE";

export const headers = { Authorization: TOKEN };

export const logInApi = `${serverAPI}/member_login.php`;

export const registerApi = `${serverAPI}/member_register.php`;

export const forgotPwApi = `${serverAPI}/pswd_reset_request.php`;

export const resetPwApi = `${serverAPI}/reset_password.php`;

export const tokenApi = `${serverAPI}/validate_reset_token.php`;

export const getUserInfo = `${serverAPI}/get_user_info.php`;

export const saveCredit = `${serverAPI}/save_credit.php`;

export const generateCredit = `${serverAPI}/generate_credit.php`;

export const getCart = `${serverAPI}/get_carts.php`;

export const checkEmail = `${serverAPI}/check_email.php`;

export const createEventAPI = `${serverAPI}/add_event_v1.php`;

export const deleteCart = `${serverAPI}/delete_cart.php`;

export const deleteMultiCart = `${serverAPI}/delete_multi_cart.php`;

export const buyCredit = `${serverAPI}/buy_credit.php`;

export const updateUserInfo = `${serverAPI}/update_userinfo.php`;

export const deleteEvent = `${serverAPI}/delete_event.php`;

export const kakaoLoginAPI = `${serverAPI}/kakao_login.php`;
