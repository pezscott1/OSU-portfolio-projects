import React from "react";
import emailjs from 'emailjs-com';

function Contact() {


  function sendEmail(e) {
    e.preventDefault();    
    emailjs.sendForm('service_1t81kmm', 'template_bwxgtmv', e.target, 'ZTD4o_sa-J_bnr3k9')
      .then((result) => {
          window.location.reload()   
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <>
      <article>
        <section>
        <h2>Contact me</h2>
      
          
        <p>I'd like to get to know a little about your listening habits!</p>
    
    <form className="contact-form" onSubmit={sendEmail}>

    <fieldset>

      <legend>Tell me about yourself...</legend>

    <p><label form="firstLast" className="required">First and Last Name
      <input type="text" 
      name="firstLast" 
      id="firstLast" 
      size="30" 
      maxLength="100" 
      required 
      placeholder="First and Last Name" 
      aria-required="true"
      autoFocus />
      </label>
    </p>
    <p>
    <label htmlFor="email" className="required">Email
      <input 
        type="email" 
        name="email" 
        id="email" 
        size="30" 
        maxLength="100" 
        required 
        pattern="[^ @]+@[^ @]+\.[a-z]+"
        aria-required="true"
        placeholder="name@host.com" />
    </label>
    </p>
    <p><label htmlFor="comments" className="required">What is your favorite kind of music?</label>
      <textarea 
        name="comments" 
        id="comments" 
        minLength="3" 
        maxLength="250" 
        required 
        aria-required="true"
        placeholder="Please fill in with between 3 and 250 characters." 
      ></textarea>
    </p>
  </fieldset>
  <fieldset>
    <legend>Let's talk about classical music...</legend>

    <label htmlFor="how">Have you ever listened to opera?</label>
      <select name="opera" id="operaList">
          <option value="I love it!" defaultValue>I love it!</option>
          <option value="Maybe once or twice">Maybe once or twice</option>
          <option value="Not really, but I'd be interested">Not really, but I'd be interested</option>
          <option value="Is Phantom of the Opera an opera?">Is Phantom of the Opera an opera?</option>
          <option value="Please turn on anything else..." >Please turn on anything else...</option>
      </select>

    <p>Would you be interested in receiving some free recordings?
      <label htmlFor="yes">
        <input type="radio" name="recordings" id="yes" value="Yes"/>
          Yes
      </label>
      <label htmlFor="no">
        <input type="radio" name="recordings" id="no" value="No"/>
          No
      </label>
      <label htmlFor="maybe">
        <input type="radio" name="recordings" id="maybe" value="Maybe"/>
          Maybe
      </label>
    </p>

    <p>
      <label htmlFor="newsletter">
        <input type="checkbox" name="subscribe" id="newsletter"  value="newsletter signup" />
        Sign me up for the newsletter!</label>
    </p>
    <p> 
      <label htmlFor="facts">
        <input type="checkbox" name="subscribe" id="facts"  value="weekly facts" />
        Send me weekly classical music facts!</label>
    </p>

    <button type="submit">Submit</button>

  </fieldset>

  </form>
</section>
</article>   
    </>
  )
}

export default Contact;
