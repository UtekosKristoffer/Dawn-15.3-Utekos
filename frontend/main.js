
//@ts-nocheck

// Verktøy og initialiserere
import { getFocusableElements } from './global.js';
import { SectionId } from './global.js';
import { HTMLUpdateUtility } from "./global.js";
import { initDetailsDisclosure } from './global.js';
import { trapFocusHandlers } from './global.js';

import { CountryProvinceSelector } from './country-province-selector.js';
new CountryProvinceSelector('Country', 'Province', { hideElement: 'ProvinceContainer' });

import { focusVisiblePolyfill } from './lib/polyfills.js';;
focusVisiblePolyfill();

import { removeTrapFocus } from './global.js';

import { initializeDetailsHandlers } from './lib/details-handler.js';
initializeDetailsHandlers();

import { DetailsDisclosure } from './details-disclosure.js';
import { HeaderMenu } from './details-disclosure.js';


// Web Components
import { CartPerformance } from './global.js';
import { CartItems, CartRemoveButton, CartNote, CartRemoveButton, cartStatus, cartUpdate, cartItems} from './components/Cart.js';
import { CartDrawer, CartDrawerItems} from './components/CartDrawer.js';
import { CartNotification } from './lib/cart-notification.js';
import { ProductForm } from './product-form.js';
import { MenuDrawer } from './components/MenuDrawer.js';
import { HeaderDrawer } from './components/HeaderDrawer.js';
import { QuantityInput } from './components/QuantityInput.js';
import { ModalDialog } from './components/ModalDialog.js';
import { ModalOpener } from './global.js';
import { BulkModal } from './components/BulkModal.js';
import { BulkAdd } from './global.js';
import { QuickOrderList } from './quick-order-list.js'
import { QuickAddBulk } from './quick-add-bulk.js';
import { DeferredMedia } from './components/DeferredMedia.js';
import { VariantSelects } from './components/variant-selects.js';
import { ProductRecommendations } from './components/ProductRecommendations.js';
import { AccountIcon } from './global.js';
import { PricePerItem } from './price-per-item.js';
import { FacetFiltersForm, PriceRange, FacetRemove } from './facets.js'
import { SearchForm } from './search-form.js';
import { MainSearch } from './main-search.js';
import { PredictiveSearch } from './components/predictive-search.js';
import { initializeScrollAnimationTrigger, initializeScrollZoomAnimationTrigger, onIntersection, SCROLL_ANIMATION_CANCEL_CLASSNAME, SCROLL_ANIMATION_OFFSCREEN_CLASSNAME, SCROLL_ZOOM_IN_TRIGGER_CLASSNAME, SCROLL_ANIMATION_TRIGGER_CLASSNAME } from './lib/animations.js';
import { PickupAvailability } from './utils/pickup-vailability.js';
import { PickupAvailabilityDrawer } from './utils/pickup-vailability-drawer.js';

