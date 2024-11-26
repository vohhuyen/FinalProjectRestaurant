import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
 
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Moonlit Vintage | Admin</title>
          <link rel="icon" href="/images/logo.jpg" /> 
        </Head>
        <body>
          <Main />
          <NextScript />
            <Script src="/vendors/jquery/dist/jquery.min.js"></Script>
            <Script src="/vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></Script>
            <Script src="/vendors/fastclick/lib/fastclick.js"></Script>
            <Script src="/vendors/nprogress/nprogress.js"></Script>
            <Script src="/vendors/Chart.js/dist/Chart.min.js"></Script>
            <Script src="/vendors/gauge.js/dist/gauge.min.js"></Script>
            <Script src="/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"></Script>
            <Script src="/vendors/iCheck/icheck.min.js"></Script>
            <Script src="/vendors/skycons/skycons.js"></Script>
            <Script src="/vendors/Flot/jquery.flot.js"></Script>
            <Script src="/vendors/Flot/jquery.flot.pie.js"></Script>
            <Script src="/vendors/Flot/jquery.flot.time.js"></Script>
            <Script src="/vendors/Flot/jquery.flot.stack.js"></Script>
            <Script src="/vendors/Flot/jquery.flot.resize.js"></Script>
            <Script src="/vendors/flot.orderbars/js/jquery.flot.orderBars.js"></Script>
            <Script src="/vendors/flot-spline/js/jquery.flot.spline.min.js"></Script>
            <Script src="/vendors/flot.curvedlines/curvedLines.js"></Script>
            <Script src="/vendors/DateJS/build/date.js"></Script>
            <Script src="/vendors/jqvmap/dist/jquery.vmap.js"></Script>
            <Script src="/vendors/jqvmap/dist/maps/jquery.vmap.world.js"></Script>
            <Script src="/vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></Script>
            <Script src="/vendors/moment/min/moment.min.js"></Script>
            <Script src="/vendors/bootstrap-daterangepicker/daterangepicker.js"></Script>
            <Script src="/build/js/custom.min.js"></Script>
        </body>
      </Html>
    )
  }
}
 
export default MyDocument