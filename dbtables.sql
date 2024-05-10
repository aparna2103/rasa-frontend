
CREATE TABLE IF NOT EXISTS public._user
(
    user_id integer NOT NULL,
    email character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(500) COLLATE pg_catalog."default",
    last_name character varying(500) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT _user_pkey PRIMARY KEY (user_id),
    CONSTRAINT uk_k11y3pdtsrjgy8w9b6q4bjwrx UNIQUE (email),
    CONSTRAINT _user_role_check CHECK (role::text = ANY (ARRAY['ADMIN'::character varying, 'CUSTOMER'::character varying]::text[]))
)

CREATE TABLE IF NOT EXISTS public.address
(
    address_id integer NOT NULL,
    city character varying(500) COLLATE pg_catalog."default",
    country character varying(500) COLLATE pg_catalog."default",
    pin_code bigint,
    state character varying(500) COLLATE pg_catalog."default",
    street character varying(500) COLLATE pg_catalog."default",
    user_id_user_id integer,
    CONSTRAINT address_pkey PRIMARY KEY (address_id),
    CONSTRAINT uk_831pw0vkvhryxnrhv8uo5wsxj UNIQUE (user_id_user_id),
    CONSTRAINT fkd5mufai7rqyuua7j6n127ae6a FOREIGN KEY (user_id_user_id)
        REFERENCES public._user (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public._order
(
    order_id integer NOT NULL,
    order_date timestamp(6) without time zone NOT NULL,
    order_status character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT 'PENDING'::character varying,
    payment_method character varying(255) COLLATE pg_catalog."default",
    total_amount bigint NOT NULL,
    user_id_user_id integer,
    CONSTRAINT _order_pkey PRIMARY KEY (order_id),
    CONSTRAINT fkdyvwtyk5co5ehk8b9mqqqnu7i FOREIGN KEY (user_id_user_id)
        REFERENCES public._user (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT _order_payment_method_check CHECK (payment_method::text = ANY (ARRAY['CREDITCARD'::character varying, 'CASH'::character varying, 'PAYPAL'::character varying]::text[]))
)

CREATE TABLE IF NOT EXISTS public.card_details
(
    card_id integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    payment_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    payment_method smallint NOT NULL,
    CONSTRAINT card_details_pkey PRIMARY KEY (card_id),
    CONSTRAINT uk_pcej0uivd8981vbslxmavtmmj UNIQUE (name),
    CONSTRAINT card_details_payment_method_check CHECK (payment_method >= 0 AND payment_method <= 2)
)

CREATE TABLE IF NOT EXISTS public.cart
(
    cart_id integer NOT NULL,
    amount bigint,
    quantity bigint,
    product_id_product_id integer,
    user_id_user_id integer,
    CONSTRAINT cart_pkey PRIMARY KEY (cart_id),
    CONSTRAINT uk_jfbpybab7kxh6d2qclmsp3r9f UNIQUE (product_id_product_id),
    CONSTRAINT fk2swgaiumxu7fvdtjve02ipap9 FOREIGN KEY (product_id_product_id)
        REFERENCES public.product (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk6vt5hif5fu17j71kwy6r2jx85 FOREIGN KEY (user_id_user_id)
        REFERENCES public._user (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.inventory
(
    inventory_id integer NOT NULL,
    quantity_left bigint NOT NULL,
    product_product_id integer,
    CONSTRAINT inventory_pkey PRIMARY KEY (inventory_id),
    CONSTRAINT uk_mbsm3gi5pge5vrtqdoo38vdsc UNIQUE (product_product_id),
    CONSTRAINT fk3ktywjbfrwiet33wb2dd8sju2 FOREIGN KEY (product_product_id)
        REFERENCES public.product (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.order_item
(
    order_item_id integer NOT NULL,
    quantity bigint,
    unit_price bigint,
    order_id_order_id integer,
    product_id_product_id integer,
    CONSTRAINT order_item_pkey PRIMARY KEY (order_item_id),
    CONSTRAINT fkjsk6lxqq7nrofnuof4xdxpaoa FOREIGN KEY (product_id_product_id)
        REFERENCES public.product (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkn7xdbc3dpk1d5mn8t5b3waqb5 FOREIGN KEY (order_id_order_id)
        REFERENCES public._order (order_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.product
(
    product_id integer NOT NULL,
    description character varying(5000) COLLATE pg_catalog."default",
    image_url character varying(5000) COLLATE pg_catalog."default" DEFAULT 'https://totalcomp.com/images/no-image.jpeg'::character varying,
    name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    price bigint,
    tag_tag_id integer,
    CONSTRAINT product_pkey PRIMARY KEY (product_id),
    CONSTRAINT uk_jmivyxk9rmgysrmsqw15lqr5b UNIQUE (name),
    CONSTRAINT fk4sv628f4jmekdw0eghfn8x3io FOREIGN KEY (tag_tag_id)
        REFERENCES public.product_tag (tag_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.product_tag
(
    tag_id integer NOT NULL,
    tag_name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    image_url character varying(5000) COLLATE pg_catalog."default" NOT NULL DEFAULT 'https://totalcomp.com/images/no-image.jpeg'::character varying,
    CONSTRAINT product_tag_pkey PRIMARY KEY (tag_id),
    CONSTRAINT uk_arb7fw988ow7xrttdn0mj8ghh UNIQUE (tag_name)
)

CREATE TABLE IF NOT EXISTS public.wishlist
(
    wishlist_id integer NOT NULL,
    product_id_product_id integer,
    user_id_user_id integer,
    CONSTRAINT wishlist_pkey PRIMARY KEY (wishlist_id),
    CONSTRAINT uk_7xva2s3k3j4c68mlbrtnocim7 UNIQUE (product_id_product_id),
    CONSTRAINT fkkl8hxpraobeyylg20r3s4lxig FOREIGN KEY (user_id_user_id)
        REFERENCES public._user (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkstwx9m3xp0mf8u0f8s566di52 FOREIGN KEY (product_id_product_id)
        REFERENCES public.product (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


