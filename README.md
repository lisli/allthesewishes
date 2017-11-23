All These Wishes
================

The simplest gift registry.


The Experience
==============

1. Visit allthesewishes.xyz, see explanation, start filling in a list
2. List is stored locally, so if you navigate away and come back it's still there
3. You're encouraged to share the list with friends by putting in their email address
4. When you share the list, the list is saved to the server and you are redirected to the "Wisher URL"; anyone with the Wisher URL can edit the list
5. Your Wish Granter gets an email saying "Your clever friend ______ shared a list with you; don't share this URL with ______! This link is for you and other wish-granters only, and is where you can comment on ______'s wishes in secret."
6. You also get an email, the first time you share the list with someone else, telling you about your Wisher URL.
7. If you want, you can also create an account, at which point your lists stop being editable simply from the Wisher URL, and require being authenticated instead.
8. If you come back after your session has expired and create a new list, it will still fall under the un-authenticated Wisher URL workflow until you sign in, at which point it gets associated with your account.


The Implementation
==================

The experience described above may only need servers for the following:

1. Storing/Retrieving Data
2. Sending Emails

Here's a basic plan for each.


Storing/Retrieving Data
-----------------------

The data can all be generated locally, within users' browsers. The data for a particular list may end up looking like this:


    {
      wisher_id: 'some-uuid',
      granter_id: 'other-uuid',
      items: [
        {
          id: 'another-uuid',
          name: 'Warm Gloves',
          size: 'Medium',
          notes: 'touch-screen enabled, plz!',
          comments: [
            { id: 'u-no', text: 'I got this one', from: 'Anonymoose' },
            ...
          ]
        },
        ...
      ]
    }

**Note the two `id` fields.** Let's say that the Wisher visits and edits the list by going to `allthesewishes.xyz/w/some-uuid`. We will then fetch these data using the `wisher_id`, and we will know by the `/w` in the URL to avoid showing them the comments. However, a Wish Granter visits and comments on this same list by going to `allthesewishes.xyz/g/other-uuid`. We would then fetch these same data by using the `granter_id`, and would know by the `/g` that they are a Granter and we want to prevent them from editing items and allow them to see and add comments.

We may be able to use Cloudant for this, and avoid a traditional server altogether. As long as we can create and store all data without needing any server-side effort, and we can then retrieve a specific list later, then we're good. We may need to alter the shape/structure of the data in order to facilitate this.

**Do we need to avoid fetching comments for the Wisher?** If the Wisher looks at the Network tab in their browser, they may be able to see the comments, even if they are hidden in the HTML. That probably doesn't matter. Good on them for figuring it out. Likewise, a clever Granter could hack the JS and edit their friend's wishes. These data probably aren't important enough to spend time preventing such tampering.


Sending Emails
--------------

Sending an email requires a server of some kind. We can probably use https://postmarkapp.com/, a lovely service, but even still that requires an API key which is sensitive and cannot be stored in a JS app.

We could store the API key in an AWS Lambda instance, and we could send a POST request to our Lambda instance in order to trigger an email.

This has a potential security hole: we want to make sure we don't create a way for spammers to send a simple POST request to our endpoint and send our emails to whoever they want as many times as they want. Will this require more than what Lambda can provide? Or will there be some way to use Cloudant and Lambda together to do anything a traditional server would do anyhow?
