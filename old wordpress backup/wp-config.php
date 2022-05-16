<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'biucouvq_wp303' );

/** MySQL database username */
define( 'DB_USER', 'biucouvq_wp303' );

/** MySQL database password */
define( 'DB_PASSWORD', '[S]Y)0F.7p@GVec3' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'ed6fxfpuddlwb2iwmiuwkbils9oojytufotlaixnqcxzpnp3dbkpfwviukbeymgi' );
define( 'SECURE_AUTH_KEY',  'miagf9xvnv7pbof1owvae5zbuhweugwsucuoxgnej5unob0rm5atyokkvx6ey7nv' );
define( 'LOGGED_IN_KEY',    'q0keqpiixbb12egtwrhqu4beza0w3xqe7kp8daimteayhszrom7ol70ngfskia6e' );
define( 'NONCE_KEY',        'iixeha2ozoeq08df8anyqnkxmujvz19pbgqicehvsrgjardtp8wqrhnzgtaugq82' );
define( 'AUTH_SALT',        'ckiafsc27ei5bpe9xthnr6ocsvfl7dvf4804cefqc3djzwurksmvuieu2fomdiob' );
define( 'SECURE_AUTH_SALT', 'v5nybp86ani66pd1hrzexccvbyq5gnvk4wdqqqbpvz9hfjegvd0hrzqsbtpluvdy' );
define( 'LOGGED_IN_SALT',   'wrrtkpe4bjq2yt4elgjoulvpoftffs3qb9cojnwcmgcc7bys1x31dd74m27fawdi' );
define( 'NONCE_SALT',       '1ie8nojycpiwuy1jo0w1nq7huvwhmfxwkunpdz3bgiwvonwwvs7gjemxqchbkbkc' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpwd_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );
define( 'WP_MEMORY_LIMIT', '256M' );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
