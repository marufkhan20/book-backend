module.exports = ({ order, customer, adminEmail }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Order Confirmation</title>
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
                  Order Confirmation
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
                  Hello ${customer},
                  <br /><br />
                  Thank you for your order! Your order details are as follows:
                  <br /><br />
                  <table
                    cellpadding="5"
                    cellspacing="0"
                    border="1"
                    width="100%"
                    style="
                      border-collapse: collapse;
                      font-size: 14px;
                      color: #555555;
                    "
                  >
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Type</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                      ${Object.keys(order?.items)?.map(
                        (key) =>
                          `<tr>
                            <td>${order?.items[key]?.item?.title}</td>
                            <td>${order?.items[key]?.qty}</td>
                            <td>${order?.items[key]?.item?.type}</td>
                            <td>$${order?.items[key]?.price}</td>
                          </tr>`
                      )}
                      <tr>
                        <td colspan="3" style="text-align: right">Total:</td>
                        <td>$${order?.totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br /><br />
                  Thank you for your business! If you have any questions or
                  concerns, please contact us at [${adminEmail}].
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
