WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Main slider
	let main_slider = document.querySelector('.main_slider .swiper')

	if (main_slider) {
		var mainSlider = new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			lazy: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				init: swiper => {
					$(`.main_slider .data .btn[data-slide-index=${swiper.realIndex}]`).addClass('active')
				},
				activeIndexChange: swiper => {
					$('.main_slider .data .btn').removeClass('active')

					$(`.main_slider .data .btn[data-slide-index=${swiper.realIndex}]`).addClass('active')
				}
			}
		})
	}


	$('.main_slider .data .btn').mouseover(function() {
		let slideIndex = $(this).data('slide-index')

		mainSlider.slideTo(parseInt(slideIndex))
	})


	// Detailing slider
	const detailingSliders = [],
		detailing = document.querySelectorAll('.detailing .swiper')

	detailing.forEach((el, i) => {
		el.classList.add('detailing_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			slidesPerView: 'auto',
			spaceBetween: 8,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		}

		detailingSliders.push(new Swiper('.detailing_s' + i, options))
	})


	$('.detailing .item .video_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item'),
			video = parent.find('video').get(0)

		$(this).toggleClass('play')

		parent.find('video').addClass('show')

		$(this).hasClass('play')
			? video.play()
			: video.pause()
	})


	// Collections slider
	const collectionsSliders = [],
		collections = document.querySelectorAll('.collections .swiper')

	collections.forEach((el, i) => {
		el.classList.add('collections_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			spaceBetween: 8,
			breakpoints: {
				0: {
					slidesPerView: 'auto'
				},
				768: {
					slidesPerView: 4
				},
				1200: {
					slidesPerView: 5
				},
				1440: {
					slidesPerView: 6
				}
			}
		}

		collectionsSliders.push(new Swiper('.collections_s' + i, options))
	})


	// Product thumbs slider
	const productThumbsSliders = [],
		productThumbs = document.querySelectorAll('.products .product .swiper')

	productThumbs.forEach((el, i) => {
		el.classList.add('product_thumbs_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			nested: true
		}

		productThumbsSliders.push(new Swiper('.product_thumbs_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})

	$('.modal .mob_close_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mini popups
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when clicking outside of it
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// 'Up' button
	$('.buttonUp .btn').click((e) => {
		e.preventDefault()

		$('body, html').stop(false, false).animate({ scrollTop: 0 }, 1000)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Search
	$('header .search form .input, .mob_search form .input').keydown(function() {
		let parent = $(this).closest('form'),
			_self = $(this)

		setTimeout(() => {
			if (_self.val().length) {
				parent.find('.clear_btn').addClass('show')
				$('header').addClass('searching')

				$('.search_tips').fadeIn(200)
			} else {
				parent.find('.clear_btn').removeClass('show')
				$('header').removeClass('searching')

				$('.search_tips').fadeOut(200)
			}
		})
	})

	$('header .search form .clear_btn, .mob_search form .clear_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('form')

		parent.find('.input').val('')

		$(this).removeClass('show')
		$('header').removeClass('searching')

		$('.search_tips').fadeOut(200)
	})


	// Mob. search
	$('.mob_header .search_btn').click(function(e) {
		e.preventDefault()

		$('.mob_search, .overlay').fadeIn(200)
	})

	$('.mob_search form .back_btn, .overlay').click(function(e) {
		e.preventDefault()

		$('.mob_search, .overlay').fadeOut(200)

		$('header').removeClass('searching')

		$('.search_tips').fadeOut(200)
	})



	$('header .search form .clear_btn').click(function(e) {
		e.preventDefault()

		$('header .search form .input').val('')

		$(this).removeClass('show')
		$('header').removeClass('searching')

		$('.search_tips').fadeOut(200)
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn, .mob_menu .close_btn').click(function(e) {
		e.preventDefault()

		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	$('.mob_menu .links .title').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$(this).next().slideToggle(300)
	})


	// Mob. footer
	$('footer .data .title').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$(this).next().slideToggle(300)
	})
})



window.addEventListener('load', function () {
	// Fixed header
	headerInit = true,
	headerHeight = $('header').outerHeight()

	$('header:not(.absolute)').wrap('<div class="header_wrap"></div>')
	$('header.absolute').wrap('<div class="header_wrap absolute"></div>')

	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Mob. fixed header
	mobHeaderInit = true,
	mobHeaderHeight = $('.mob_header').outerHeight()

	$('.mob_header:not(.absolute)').wrap('<div class="mob_header_wrap"></div>')
	$('.mob_header.absolute').wrap('<div class="mob_header_wrap absolute"></div>')

	$('.mob_header_wrap').height(mobHeaderHeight)

	mobHeaderInit && $(window).scrollTop() > mobHeaderHeight
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



window.addEventListener('scroll', function () {
	// 'Up' button
	$(window).scrollTop() > $(window).innerHeight()
		? $('.buttonUp').fadeIn(300)
		: $('.buttonUp').fadeOut(200)


	// Fixed header
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Mob. fixed header
	typeof mobHeaderInit !== 'undefined' && mobHeaderInit && $(window).scrollTop() > mobHeaderHeight
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Fixed header
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > headerHeight
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)


	// Mob. fixed header
	mobHeaderInit = false
		$('.mob_header_wrap').height('auto')

		setTimeout(() => {
			mobHeaderInit = true
			mobHeaderHeight = $('.mob_header').outerHeight()

			$('.mob_header_wrap').height(mobHeaderHeight)

			mobHeaderInit && $(window).scrollTop() > mobHeaderHeight
				? $('.mob_header').addClass('fixed')
				: $('.mob_header').removeClass('fixed')
		}, 100)


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})