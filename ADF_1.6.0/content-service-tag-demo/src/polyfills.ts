import 'core-js/es6';
import 'core-js/es7/reflect';
import 'intl';

require('zone.js/dist/zone'); // IE 8-11

if (process.env.ENV === 'production') {
    // Production

} else {
    // Development

    Error['stackTraceLimit'] = Infinity;

    require('zone.js/dist/long-stack-trace-zone');
}
