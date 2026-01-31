const axios = require('axios');

const javaCode = `
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SimpleSeleniumTest {
    public static void main(String[] args) {

        // Set ChromeDriver path
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");

        // Launch browser
        WebDriver driver = new ChromeDriver();

        // Open website
        driver.get("https://www.google.com");

        // Print page title
        System.out.println(driver.getTitle());

        // Close browser
        driver.quit();
    }
}
`;

async function testConversion() {
    try {
        console.log("Sending request to backend...");
        const res = await axios.post('http://localhost:3001/api/convert', {
            sourceCode: javaCode
        });

        console.log("\n--- Backend Response ---");
        console.log("Status:", res.data.status);
        console.log("\n--- Converted Code ---");
        console.log(res.data.convertedCode);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

testConversion();
