const http = require("http");

const server = http.createServer((req,res)) => {
	const urlPath = req.url;
	if (urlPath === '/overview'){
		res.end("This is a wordgame that will have a beginner levelpack and soon a daily puzzle section.")
	} else if (urlPath === "/mentalgym"){
		res.end("MentalGym is the overall platform for all the wordgames hosted on this site.")
	} else if (urlPath == "/api"){
		res.writeHead(200, {"Content-Type"; "application/json"});
		res.end(
			JSON.stringify({
				product_id: "yes"
		})
			);
	}else {
		res.end("Successfully started a server.");
	}
}
server.listen(3000, "localhost", () => {
	console.log("Listening for requests.");
});