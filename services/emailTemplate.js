module.exports = (link) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        align="center"
        width="100%"
        bgcolor="#ffffff"
        style="max-width: 600px; margin: 0 auto"
      >
        <tr>
          <td>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100%"
              style="background-color: #1abc9c"
            >
              <tr>
                <td
                  style="
                    padding: 20px 0;
                    text-align: center;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: bold;
                  "
                >
                  Email Verification
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100%"
              style="padding: 20px"
            >
              <tr>
                <td style="font-size: 16px; line-height: 24px; color: #555555">
                  Hello,
                  <br /><br />
                  Thank you for registering with our website. Please click on the
                  button below to verify your email address and activate your
                  account.
                  <br /><br />
                  <div style="text-align: center">
                    <span
                      style="
                        display: inline-block;
                        background-color: #1abc9c;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                      "
                      >${link}</
                    span>
                  </div>
                  <br /><br />
                  Thanks,<br />
                  The Website Team
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              width="100%"
              style="
                background-color: #f1f1f1;
                padding: 10px;
                font-size: 12px;
                color: #777777;
              "
            >
              <tr>
                <td style="text-align: center">
                  This email was sent to you by our website. To unsubscribe, click
                  <a href="#" style="color: #777777">here</a>.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
