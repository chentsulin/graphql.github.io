/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

<<<<<<< HEAD
var HeaderLinks = React.createClass({
  linksInternal: [
    {section: 'docs', text: 'Docs', href: '/graphql.github.io/docs/getting-started/' },
    {section: 'blog', text: 'Blog', href: '/graphql.github.io/blog/' },
    {section: 'help', text: 'Help', href: '/graphql.github.io/help/' },
    {section: 'code', text: 'Code', href: '/graphql.github.io/code/' },
  ],
  linksExternal: [
    {section: 'spec', text: 'Spec', href: 'http://facebook.github.io/graphql/' },
  ],
=======
const links = [
  { section: 'learn', text: 'Learn', href: '/learn/' },
  { section: 'code', text: 'Code', href: '/code/' },
  { section: 'community', text: 'Community', href: '/community/' },
  { section: 'blog', text: 'Blog', href: '/blog/' },
  { section: 'spec', text: 'Spec', href: 'http://facebook.github.io/graphql/' },
];
>>>>>>> upsteam/source

export default ({ section }) =>
  <nav>
    {links.map(link =>
      <a
        key={link.section}
        href={link.href}
        target={link.href.slice(0, 4) === 'http' ? '_blank' : null}
        rel={link.href.slice(0, 4) === 'http' ? 'noopener noreferrer' : null}
        className={link.section === section ? 'active' : null}>
        {link.text}
      </a>
    )}
  </nav>
