// ASCII码字符串打印

const imgSpd = () => {
/* 
  _                              _     _           
 (_)                            (_)   | |          
  _ _ __ ___   __ _    ___ _ __  _  __| | ___ _ __ 
 | | '_ ` _ \ / _` |  / __| '_ \| |/ _` |/ _ \ '__|
 | | | | | | | (_| |  \__ \ |_) | | (_| |  __/ |   
 |_|_| |_| |_|\__, |  |___/ .__/|_|\__,_|\___|_|   
               __/ |      | |                      
              |___/       |_|                                                             
*/
};

const consoler = () =>
  imgSpd
    .toString()
    .substring(
      imgSpd.toString().indexOf("/*") + 3,
      imgSpd.toString().lastIndexOf("*/")
    );

module.exports = consoler;
