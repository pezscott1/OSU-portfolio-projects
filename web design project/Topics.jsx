import { useState } from 'react'

function Topics() {

  return (
    <>
         <h2>Topics</h2>
        <section>
            <h2>Web Development Concepts</h2>
            <nav className="local">
                <a href="#webservers">Web Servers</a>
                <a href="#frontendDesign">Frontend Design</a>
                <a href="#optimizingImages">Optimizing Images</a>
                <a href="#favicons">Favicons</a>
                <a href="#cascadingStylesheets">Cascading Stylesheets</a>
                <a href="#forms">Forms</a>
                <a href="#express">Express</a>
                <a href="#javascript">JavaScript</a>
            </nav>
            <article id="webServers">
                <h3>Web Servers</h3>
                <p>Most servers will map the '/' in a URL to index.html, which is referred to as the <strong>designated homepage</strong>. The file index.html in the root directory is called the homepage of the application,
                     and the web application will return this file whenever a GET request is received for the '/'.
                     On .NET servers, the use of default.html is allowed. In other cases, the server might look for index.js or index.php as the homepage.
                </p>
                <p>If the Web Dev Inspector is used to view a <strong>request</strong>, the <strong>header</strong> will return the URL, request method, status code, remote address, and policy. Additionally, the language, cache controls, host, encoding, and other details are visible.
                    If the <strong>response</strong> is viewed, the cache details, content type, dates, and <strong>raw response data</strong> -- which include HTML, CSS, and JavaScript -- will be shown. The view
                    from the server's point of the view will be the <strong>response</strong> data, since a request is sent to a server and in its response it includes the code of the page being requested, 
                    whereas a request sent from a local machine won't include this data in the request itself.
                   
                </p>
                <p><strong>Response Status Codes:</strong> 
                    The favicon.ico file has a status 200 because the server making the request was 
                    able to locate the resource, which returns 200 when everything is ok.  The main.css and main.js files have a status 404 because these resources don't exist yet, 
                    so there's nothing to return. A 404 code indicates Not Found.
                </p>
                <p>My web server's URL is <strong>https://web.engr.oregonstate.edu/~dispenss/a4-dispenss</strong>. 
                    The <strong>scheme</strong> is https, the <strong>subdomains</strong> are web and engr, the <strong>host domain</strong> is oregonstate.edu, and the <strong>resources</strong> are ~dispenss and a2-dispenss. 
                </p>
            </article>
            <article id="frontendDesign">
                <h3>Frontend Design</h3>

                <p>The concept of <strong>frontend design</strong>:
                    The idea of good frontend design will encompass multiple factors, each one influencing the success of our design. We could choose
                    to vary our color scheme and font choice to set off parts of pages or between pages. We can include all different kinds of media -- videos, 
                    photos, even audio recordings -- to enrich the user experience. The way the user interfaces with the site can be changed depending on the way someone is 
                    interacting with it. Usability is also an important factor. This includes the <strong>five E's of usability</strong> in addition 
                    to managing response times, depth levels, and accounting for different types of devices being used. The programmer should also include
                    robust <strong>usability testing</strong> to ensure the site or app meets all the objectives. This should include: </p>
                    <ul>
                        <li>Collecting data on the paths users take to do tasks.</li>
                        <li>Tracking the errors users make.</li>
                        <li>How fast users do a task.</li>
                        <li>Whether they succeed in doing the task.</li>
                    </ul>
                
                <p><strong>The five E's of usability</strong></p>
                <dl>
                    <dt><strong>Effective:</strong></dt>
                    <dd>Complete and effective completion of the task by the user. For example, was information
                        skipped over or were there mistakes repeated by many users?
                    </dd>
                    <dt><strong>Efficient:</strong></dt>
                    <dd>How quickly a user can navigate your site or accomplish their task. The problems of how long tasks take to complete
                        and how easy the layout and navigation are to use should be addressed.
                    </dd>
                    <dt><strong>Engaging:</strong></dt>
                    <dd>How well the design and implementation draw the user and listen to user responses to gauge success.</dd>
                    <dt><strong>Easy to learn:</strong></dt>
                    <dd>Is the site easy to use initially, and does it support continued learning? If the workflow is confusing
                        or text is unhelpful, the user will be less inclined to return.
                    </dd>
                    <dt><strong>Error-tolerant:</strong></dt>
                    <dd>Prevents errors well and helps the user to keep utilizing the site when errors do occur. Thorough testing of 
                        likely mistakes and helpful guidance when errors occur is key.
                    </dd>
                </dl>

                <h4>The purpose of the <strong>page layout tags</strong>: </h4>
                <p>The page layout tags are <strong>block-level elements</strong> that set off one set of text from another. 
                This is achieved by including a <strong>newline</strong> before and after the text in between the tags. The <strong>header</strong> is 
                used to display the title or banner of the site, along with a logo, if used. The <strong>nav</strong> tag is used to navigate between pages within 
                the site. The <strong>main</strong> tag is used to set off the primary focus of the page. <strong>Section</strong> is used for text that is related but should
                be split up in some way, often by using the <strong>article</strong> tag. This is usually used to denote separate, specific items
                that are semantically related to each other inside the section. And lastly, the <strong>footer</strong> is used below the main tag
                and includes the copyright information, legal information, and, potentially, contact information. In addition, using the <strong>meta </strong>
                tag in the <strong>head</strong> section, we can allow or disallow robots from following our page for better search engine optimization.</p>


                <p>How <strong>anchors</strong> link to content, internal content, and from page-to-page:</p>
                <ol>
                    <li>Anchors link to external content using either href or src, depending on the nature of the content. For videos, images, and scripts
                        we use src, and for links to external pages we use href.
                    </li>
                    <li>For linking to internal content, we use an anchor and a reference ID to the item we wish to link to. This ID needs to be included in the 
                        tag of the item we want to use.
                    </li>
                    <li>For linking from page to page, we use a nav tag and anchors to make navigation around the site easy to use.

                    </li>
                </ol>
            </article>
            <article id="optimizingImages">
                <h3>Optimizing Images</h3>

                <p>In order to optimize images for use on our sites, there are 6 major specifications to consider. Using a 
                    <strong> descriptive file name</strong> will aid search engines and the user to easily understand what the photo will contain.
                    <strong> Small file sizes</strong> are necessary to ensure quick loading times. This is typically done using some form of compression, which can reduce file 
                    sizes without degrading the image quality too much. JPG is the most common lossy file type for photos, which can reduce file size greatly, but at the cost 
                    of possible blurring if compression is improperly applied. The most common lossless format is .png, which are typically larger than JPGs and 
                    are used when more detail is required. Using cropping and resizing to have the photo fit <strong>exact dimensions</strong> will enable photos and videos to load properly. Accounting for 
                    the typical widths of different screens will ensure a smooth look. This can be achieved by having several versions of each piece of media 
                    to be served up depending on the device or monitor the user is on. Using the <strong>correct file format</strong> depending on the type of media will ensure they look their best.
                    For photos that require detail, .png is used, whereas .jpg pr .webp are usually appropriate for most uses because of their smaller file sizes. For line art or animation, 
                    .png, .svg, or .gif are used. These all offer transparency and have different strengths depending on the need of the creator.
                    <strong> Reduced resolution</strong> has often been necessary to convert images from higher pixels per square inch to the 72 ppi standard for online optimization. Some monitors and phones are now capable of 
                    rendering higher resolution so there may be a need for multiple sizes and resolutions to accommodate this. The <strong>color mode</strong> of .jpg, .svg, and .webp is RBG,
                    and is Indexed for .gif. It is often RGB for .png files but can be compressed to use Indexed color. 
                </p>
                    <p>The <strong>file formats</strong> appropriate to photos are .jpg and .webp. JPEGs can compress into small sizes and keep their rectangular shape. The same holds true for WEBP files. 
                    For line art, including logos and icons, .png, .svg, and .gif are the most appropriate. </p>
            </article>
            <article id="favicons">
                <h3>Favicons</h3>

                <p>Favicons, or favorite icons, provide an easy-to-recognize symbol of your business or site. They can be text or an image, and 
                    many creators will create several versions depending on their intended use -- more detailed, larger versions that could appear
                    as an icon on a phone or computer, and less detailed, smaller versions for appearing in a browser tab. They were traditionally created using the .ico file
                    type for Internet Explorer, but now is often rendered as a .svg or .png file. 
                </p>
            </article>
            <article id="cascadingStylesheets">
                <h3>Cascading Stylesheets</h3>

                <p>
                    Incorporating stylesheet into websites and apps allows for customization and decoration of elements and the easier handling of various kinds of media. HTML elements have built-in defaults
                    for styling, but using a stylesheet allows for much greater customization and specificity. In addition, it allows the designer to maintain a house
                    style over an entire site by utilizing classes and IDs to easily change multiple areas at the same time and ensure they are consistent. 
                </p>
                <p>
                    There are 5 main ways to incorporate CSS into a website or app. Firstly, there are two <strong>external</strong> methods. One can <strong>link</strong> to an external file or
                    <strong> import</strong> it. These are the preferred methods for incorporating stylesheets because they are the most efficient way to make global changes to your site or app. In addition, one can <strong>directly</strong> incorporate CSS 
                    using one of 3 methods. The first is <strong>embedding</strong>  with a 'style' tag. As well, you could use an <strong>inline</strong> attribute and value, though this is deprecated as an old method.
                    Finally, using regular <strong>JavaScript</strong>, we could incorporate one-off styles for an element.
                </p>
            </article>
            <article id="forms">
                <h3>Forms</h3>
                <p>
                    The goal in making forms accessible is to improve the use experience for all users, thinking especially of those with 
                    a disability. In doing so, we should <strong>provide clear instructions</strong> so that screenreaders and those with limited sight
                    can understand what information we're seeking. We should let the users know the <strong>purpose</strong> of what information we're seeking 
                    and which parts are <strong>required</strong>. We should set the first field to <strong>autofocus</strong> to enable those who use tab control to 
                    easily reach the first field and those thereafter. We also need to allow for <strong>keyboard-only</strong> use for those not using a mouse or trackpad.
                    Adding <strong>tab indexing</strong> to complex forms will help the user understand the intended flow of information input. Lastly, we should ensure the 
                    validation message is <strong>screen-readable</strong> to allow limited or non-sighted users to have confirmation of what they entered.
                </p>
                <p>
                    The tags of forms includes the <strong>form</strong> tag, which has two attributes: <strong>action</strong> and <strong>method</strong>. The action attribute 
                    is used to tell the form where to send the collected data. It can be an absolute URL or relative path. If no action attribute is supplied, the default is to send 
                    it to the same URL that downloaded it. The method attribute specifies the HTTP method to be used in the request. Typically, this is either <strong>GET</strong> or <strong>SET</strong>. 
                    <strong> Fieldset</strong> is used to separate the form into logical groups. The <strong>legend</strong> tag is used to describe the fieldset and is placed on top of its border.
                    The <strong>label</strong> tag is used to describe the entry the user is about to input. It's especially helpful for those with screen readers and helps all users understand the purpose of that field.
                    <strong> Input</strong> tags have 22 reference types that can change what they do and how they're displayed based on the type="" that is used with it. Some examples of inputs types are <strong>checkboxes </strong> 
                     and <strong>radio buttons</strong>. A <strong>text area</strong> allows for free-form input when you want the user to be able to add a comment or give feedback in their own words. A <strong>button</strong> is often used 
                    to style the sending of the form and can be made accessible to everyone using your form. And finally, a <strong>select</strong> tag with <strong>options</strong> is used to create a 
                    dropdown menu containing the options you'd like the user to choose from.
                </p>
                <p>
                    Using styling of forms can help differentiate each section of the form and help your form adhere to the style of the rest of the website. In addition, it can help 
                    highlight things like required fields through a color change, and perhaps a change of background color for the field in focus to help the user 
                    understand which field is currently being utilized. We might want placeholder text in a field to be a lighter shade than the user's entry, or we might want a checkbox or a button 
                    to change color if it's been selected. Reducing confusion, allowing access to all users, and creating a homogenous look with the rest of the site are the main goals of good form styling.
                 </p>
            </article>
            <article id="express">
                <h3>Express</h3>
                <p> Node is an environment for developing server-side and networking applications. Its applications are written in JavaScript and can be run on any operating system. 
                    NPM is the node package manager and makes it simpler to develop applications using its rich library of resources. It is both an online, searchable library and a command-line utility, from which we can directly implement packages into our program.
                    Express uses Node to help build web applications. Express has the ability to get, post, and delete data, and set ports for routing the information. In addition, it can help us serve static files and to use middleware to handle requests made within the routing.
                </p>
            </article>
            <article id="javascript">
                <h3>JavaScript</h3>
                <p>
                    In JavaScript, the main data types are <strong>number</strong>, <strong>Boolean</strong> (either false or true), <strong>null</strong>, <strong>undefined</strong>, <strong>string</strong>, <strong>symbol</strong>, and <strong>object</strong>. All the types are considered <strong>primitive</strong> types except objects. 
                    The <strong>properties</strong> of <strong>objects</strong> can be described by the acronym CRUD, for <strong>create</strong>, <strong>read</strong>, <strong>update</strong>, and <strong>delete</strong>. <strong>Arrays</strong> are a type of object that use string numbers as the properties. The same operations that apply to objects also apply to arrays.
                </p> 
                <p> The values in an array can be of any type, including objects themselves. <strong>JSON</strong> stands for <strong>JavaScript Object Notation</strong> and is a common method for exchanging data in a consistent, easy-to-read format. It is supported by many languages and uses the methods <strong>JSON.stringify()</strong> and <strong>JSON.parse()</strong>, respectively, 
                    to create and unpack JSON to and from JavaScript. </p>
                <p>
                    Like most programming languages, JavaScript uses <strong>conditionals</strong> and <strong>loops</strong> to implement various kinds of logic in our code. The conditionals are <strong>if</strong> and <strong>switch</strong> statements for logical branching and behave much as they do in other languages. They use either strict or loose equality and JavaScript can automatically convert types, which should be avoided.
                    For looping, there are regular <strong>for</strong> loops, <strong>for in</strong>, and <strong>for of</strong> loops. The latter two are used to iterate through an iterable value, such as a string or array, and to iterate through the properties of an object, respectively. In addition, there are <strong>while</strong> and <strong>do while</strong> loops. The while loop is only executed if the condition evaluates to true, whereas the 
                    do while loop will always execute at least once, even if the condition is false. </p>
                <p> <strong>Object-oriented programming</strong> utilizes <strong>classes </strong>and <strong>constructors</strong> to build an environment with which to use the objects we create. Formerly, JavaScript employed <strong>prototypes</strong>, but they are no longer recommended. </p> 
                <p> <strong>Functional programming</strong> utilizes the fact that functions are "first-class" values, which means we can design functions that can take or return other functions and assign them to variables. These are frequently-used features of JavaScript that can lead to more powerful code. 

                </p>
            </article>
        </section>
      
    </>
  )
}

export default Topics;
