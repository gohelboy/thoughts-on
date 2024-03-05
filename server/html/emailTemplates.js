exports.emailVerificationTemplate = (link) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Roboto Serif', serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333;
            }
    
            p {
                color: #555;
            }
    
            .verification-link {
                display: inline-block;
                margin-top: 15px;
                padding: 10px 20px;
                background-color: #b5c5cf;
                color: #161f14;
                text-decoration: none;
                border-radius: 5px;
            }
    
            .footer {
                margin-top: 20px;
                color: #777;
                font-size: 12px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>Email Verification</h1>
            <p>Thank you for signing up with Thoughts On. To complete your registration, please click the button below to verify your email address:</p>
            <a class="verification-link" target=”_blank” href=${link} >Verify Email</a>
            <p class="footer">If you didn't sign up for Thoughts On, you can safely ignore this email.</p>
        </div>
    </body>
    
    </html>`
}

exports.forgetPasswordTemplate = (link) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          color: #555;
          line-height: 1.6;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          margin: 20px auto;
          background-color: #4CAF50;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
    
      <div class="container">
        <h1>Password Reset</h1>
    
        <p>Hello,</p>
    
        <p>We received a request to reset your password. Please click the button below to reset your password:</p>
    
        <p>
          <a href=${link} class="btn">Reset Password</a>
        </p>
    
        <p>If you didn't request this, you can ignore this email and your password will not be changed.</p>
    
        <p>Thank you,<br>  Thoughts On Team</p>
      </div>
    
    </body>
    </html>
    `
}