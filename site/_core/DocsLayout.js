/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var React = require('react');
var Site = require('./Site');
var Marked = require('./Marked');
var DocsSidebar = require('./DocsSidebar');

<<<<<<< HEAD
var DocsLayout = React.createClass({
  render: function() {
    var page = this.props.page;
    var site = this.props.site;
    return (
      <Site section="docs" title={page.title}>
        <section className="content wrap documentationContent">
          <DocsSidebar site={site} page={page} />
          <div className="inner-content">
            <h1>{page.title}</h1>
            <Marked>{page.content}</Marked>
            <div className="docs-prevnext">
              {page.previous && <a className="docs-prev" href={'/graphql.github.io' + path.resolve(page.url, page.previous)}>&larr; Prev</a>}
              {page.next && <a className="docs-next" href={'/graphql.github.io' + path.resolve(page.url, page.next)}>Next &rarr;</a>}
            </div>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = DocsLayout;
=======
export default ({ page, site }) =>
  <Site section="docs" title={page.title} page={page}>
    <section>
      <div className="documentationContent">
        <div className="inner-content">
          <h1>{page.title}</h1>
          <Marked>{page.content}</Marked>
          {page.next &&
            <a className="read-next" href={path.resolve(page.url, page.next)}>
              <span className="read-next-continue">Continue Reading &rarr;</span>
              <span className="read-next-title">{page.nextPage.title}</span>
            </a>}
        </div>
        <DocsSidebar site={site} page={page} />
      </div>
    </section>
  </Site>
>>>>>>> upsteam/source
