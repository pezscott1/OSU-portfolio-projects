
function Home() {

  return (
    <>
         <h2>Welcome!</h2>
        <article>
            <h3>Scott Dispensa's 2024 CS290 Portfolio project</h3>
            <p>This page is a showcase of the variety of exercises that took place in CS290. There is a contact page with a working 
              form that will send you an email, a page of operas and their lengths and debut dates at the Metropolitan Opera in New York, 
              there is an order page for fictional pet toys, a gallery of hobbies and travel photos, and finally, some information about various
              topics covered in the course.
            </p>
            <p>
              I'm a non-traditional student who pursued a career in the arts before making the decision to move in computer science. I received a Master's degree
              from The Juilliard School and have been fortunate to have had a full-time position in the chorus of the Metropolitan Opera since 2010. However, 
              with the birth of our child, my wife and I have come to the conclusion that having both of us away most nights performing isn't ideal and I began to think
              about ways I could branch out from the arts. Upon completion of the Bachelor's program, I intend to seek a position in computer engineering. I'm 
              eager to explore the many potential paths my learning and interests might take, including security, cloud, AI, or something else, and intend to take electives
              that will help clarify that direction. 
            </p>
            <p>
            This website utilizes many technologies explored throughout the course, including:
            </p>
              <ul>
                <li>Basic HTML, CSS, and JavaScript.</li>
                <li>A gallery page that incorporates optimized images for fast loading.</li>
                <li>Importing a personalized favicon to have a special watermark on each page and the website banner.</li>
                <li>A back-end database using MongoDB that allows for CRUD operations.</li>
                <li>An order page that incorporates the concept of lifting state up to dynamically display changes in quantity and subtotals.</li>
                <li>Making use of Express as middleware to handle requests made in the routing and to get, post, and delete data.</li>
                <li>Using node.js to handle external package implementation and port connections. </li>
                <li>A contact page using a form to gather user information that will email a confirmation to the user.</li>
                <li>Utilizing React components to build a user interface that can respond to user inputs without making new HTTP requests.</li>
              </ul>
            
        </article>
    </>
  )
}

export default Home;
