module.exports = {
  APPLICATION_ID:
    process.env.APPLICATION_ID ||
    "cda0fab3c4661948d1b0273ba73861aacfab70305400ff3e266bc953d00159f1",
  SECRET:
    process.env.SECRET ||
    "448ca165f10e3b5eaa4db0435f7a769efa886d93fbd73895b7ac876ebfc351ed",
  CALLBACK_URL: process.env.CALLBACK_URL || "http://localhost:3000"
};
