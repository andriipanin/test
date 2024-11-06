<?php
/**
 * WP Search With Algolia instantsearch template file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @version 2.0.0
 * @package WebDevStudios\WPSWA
 */

get_header();
get_template_part( 'template-parts/resources-top-banner');
get_template_part( 'template-parts/algolia-search');
?>

	<div id="ais-wrapper" class="container ais-wrapper__container">
		<main id="ais-main">

			<div class="ais-tags">
				<section class="ais-facets" id="facet-tags"></section>
			</div>
			<div class="algolia-search-box-wrapper hidden">

				<div id="algolia-stats"></div>
				<div id="algolia-powered-by"></div>
			</div>
			<div id="algolia-hits"></div>
			<div id="algolia-pagination"></div>
		</main>
		<aside id="ais-facets">
			<div>
				<h3 class="widgettitle"><?php esc_html_e( 'Post Types', 'wp-search-with-algolia' ); ?></h3>
				<section class="ais-facets" id="facet-post-types"></section>
			</div>
			<div>
				<h3 class="widgettitle"><?php esc_html_e( 'Categories', 'wp-search-with-algolia' ); ?></h3>
				<section class="ais-facets" id="facet-categories"></section>
			</div>
			
			<div>
				<h3 class="widgettitle"><?php esc_html_e( 'Users', 'wp-search-with-algolia' ); ?></h3>
				<section class="ais-facets" id="facet-users"></section>
			</div>
		</aside>
	</div>

	<script type="text/html" id="tmpl-instantsearch-hit">
		<article itemtype="http://schema.org/Article" class="ais-hits--article">
			<div class="ais-hits--content">
				<h2 itemprop="name headline" class="ais-hits--title"><a href="{{ data.permalink }}" title="{{ data.post_title }}" class="ais-hits--title-link" itemprop="url">{{{ data._highlightResult.post_title.value }}}</a></h2>
				<div class="ais-hits--date">{{{ data['post_date_formatted'] }}}</div>
				<div class="excerpt ais-hits--excerpt">
					<p>
						<# if ( data._snippetResult['content'] ) { #>
							<span class="suggestion-post-content ais-hits--content-snippet">{{{ data._snippetResult['content'].value }}}</span>
						<# } #>
					</p>
				</div>
				<div class="ais-hits--link-wrapper">
					<a href="{{ data.permalink }}" title="{{ data.post_title }}" class="ais-hits--link" itemprop="url">Read more</a>
				</div>
				<div class="ais-hits--tags">
					<# for (var index in data.taxonomies.post_tag) { #>
						<span class="ais-hits--tag">{{{ data._highlightResult.taxonomies.post_tag[index].value }}}</span>
					<# } #>
				</div>
				
			</div>
			<div class="ais-clearfix"></div>
		</article>
	</script>


	<script type="text/javascript">
		jQuery(function() {
			if(jQuery('#algolia-search-box').length > 0) {

				if (algolia.indices.searchable_posts === undefined && jQuery('.admin-bar').length > 0) {
					alert('It looks like you haven\'t indexed the searchable posts index. Please head to the Indexing page of the Algolia Search plugin and index it.');
				}
				
				/* Instantiate instantsearch.js */
				var search = instantsearch({
					indexName: algolia.indices.searchable_posts.name,
					searchClient: algoliasearch( algolia.application_id, algolia.search_api_key ),
                    searchFunction: function (helper) {
                        if (helper.state.query) {
                            helper.setQueryParameter('filters', 'post_type_label:Posts').search();
                            helper.search();
                        }
                    },
					routing: {
						router: instantsearch.routers.history({ writeDelay: 1000 }),
						stateMapping: {
							stateToRoute( indexUiState ) {
								return {
									s: indexUiState[ algolia.indices.searchable_posts.name ].query,
									page: indexUiState[ algolia.indices.searchable_posts.name ].page
								}
							},
							routeToState( routeState ) {
								const indexUiState = {};
								indexUiState[ algolia.indices.searchable_posts.name ] = {
									query: routeState.s,
									page: routeState.page
								};
								return indexUiState;
							}
						}
					}
				});

				search.addWidgets([

					/* Search box widget */
					instantsearch.widgets.searchBox({
						container: '#algolia-search-box',
						placeholder: 'Search',
						showReset: false,
						showSubmit: true,
						searchAsYouType: true,
						showLoadingIndicator: false,
					}),

					/* Stats widget */
					instantsearch.widgets.stats({
						container: '#algolia-stats'
					}),

					/* Hits widget */
					instantsearch.widgets.hits({
						container: '#algolia-hits',
						hitsPerPage: 10,
						templates: {
							empty: 'No results were found for "<strong>{{query}}</strong>".',
							item: wp.template('instantsearch-hit')
						},
						transformData: {
							item: function (hit) {

								function replace_highlights_recursive (item) {
									if (item instanceof Object && item.hasOwnProperty('value')) {
										item.value = _.escape(item.value);
										item.value = item.value.replace(/__ais-highlight__/g, '<em>').replace(/__\/ais-highlight__/g, '</em>');
									} else {
										for (var key in item) {
											item[key] = replace_highlights_recursive(item[key]);
										}
									}
									return item;
								}

								hit._highlightResult = replace_highlights_recursive(hit._highlightResult);
								hit._snippetResult = replace_highlights_recursive(hit._snippetResult);

								return hit;
							}
						}
					}),

					/* Pagination widget */
					instantsearch.widgets.pagination({
						container: '#algolia-pagination',
						scrollTo: document.querySelector('.resources-search-section-anchor'),
						padding: 2,
					}),

					/* Post types refinement widget */
					instantsearch.widgets.menu({
						container: '#facet-post-types',
						attribute: 'post_type_label',
						sortBy: ['isRefined:desc', 'count:desc', 'name:asc'],
						limit: 10,
					}),

					/* Categories refinement widget */
					instantsearch.widgets.hierarchicalMenu({
						container: '#facet-categories',
						separator: ' > ',
						sortBy: ['count'],
						attributes: ['taxonomies_hierarchical.category.lvl0', 'taxonomies_hierarchical.category.lvl1', 'taxonomies_hierarchical.category.lvl2'],
					}),

					/* Tags refinement widget */
					instantsearch.widgets.refinementList({
						container: '#facet-tags',
						attribute: 'taxonomies.post_tag',
						operator: 'and',
						limit: 15,
						sortBy: ['isRefined:desc', 'count:desc', 'name:asc'],
					}),

					/* Users refinement widget */
					instantsearch.widgets.menu({
						container: '#facet-users',
						attribute: 'post_author.display_name',
						sortBy: ['isRefined:desc', 'count:desc', 'name:asc'],
						limit: 10,
					}),

					/* Search powered-by widget */
					instantsearch.widgets.poweredBy({
						container: '#algolia-powered-by'
					}),

					instantsearch.widgets.sortBy({
							container: '#sort-by',
							items: [
									{ label: 'By Relevance', value: 'wp_posts_post' },
									{ label: 'A-Z', value: 'wp_posts_post_az' },
									{ label: 'Z-A', value: 'wp_posts_post_za' },
									{ label: 'Date', value: 'wp_posts_post_sortByDate'}

							],
					})
				]);

				/* Start */
				search.start();

				jQuery( '#algolia-search-box input' ).attr( 'type', 'search' ).trigger( 'select' );
				//algolia search sortby tracking
				jQuery(".algolia-search-section__categories-sortby").on('click', function() {
					// in the handler, 'this' refers to the box clicked on
					let $box = jQuery(this);
					let sortIndex = null;
					if ($box.is(":checked")) {
						let group = "input:checkbox[name='" + $box.attr("name") + "']";
						jQuery(group).prop("checked", false);
						$box.prop("checked", true);
						//jQuery(document).find('.ais-SortBy-select').val($box.val()).change();
						sortIndex = $box.val();
					} else {
						$box.prop("checked", false);
						//jQuery(document).find('.ais-SortBy-select').val('wp_posts_post').change();
						sortIndex = 'wp_posts_post';
					}
					search.helper
					.setIndex(sortIndex)
					.search();
				});
			}
		});
	</script>

<?php
get_template_part( 'template-parts/section-form');
get_template_part( 'template-parts/section-our-offices');
get_footer();
