<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = strip_tags(trim($_POST["firstName"]));
    $lastName = strip_tags(trim($_POST["lastName"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $queryType = trim($_POST["queryType"]);
    $message = trim($_POST["message"]);
    $consent = isset($_POST["consent"]);

    if (empty($firstName) || empty($lastName) || empty($email) || empty($queryType) || empty($message) || !$consent) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "ieenterprises.ai@gmial.com";

    // Set the email subject.
    $subject = "New contact form submission from $firstName $lastName";

    // Build the email content.
    $email_content = "First Name: $firstName\n";
    $email_content = "Last Name: $lastName\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Query Type: $queryType\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $firstName $lastName <$email>";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
