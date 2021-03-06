/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

const links = [
  { section: 'learn', text: 'Learn', href: '/graphql.github.io/learn/' },
  { section: 'code', text: 'Code', href: '/graphql.github.io/code/' },
  { section: 'community', text: 'Community', href: '/graphql.github.io/community/' },
  { section: 'blog', text: 'Blog', href: '/graphql.github.io/blog/' },
  { section: 'spec', text: 'Spec', href: 'http://facebook.github.io/graphql/' },
];

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
