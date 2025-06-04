# SOLUTION

## Estimation

Estimated: 10 hours

Spent: 12 hours 

## Solution

### Implementation Details

1. **Designing**
   - Spend 3 hours and 30 minutes implementing responsive design
   - Spend extra 1 hour enhancing the Product List table design
   - Spend extra 1 hour and 30 minutes enhancing the Filters design
   - Spend extra 30 minutes enhancing the View Products Modal design
   - Spend extra 2 hours and 30 minutes fixing bugs
   - Spend extra 1 hour and 30 minutes implementing URL synchronization and React Router setup

2. **Product Listing**
   - Implemented product table with pagination
   - Used React Query for data fetching and caching
   - Added loading and error states
   - Enhanced pagination with custom items per page options (5, 10, 15, 20)
   - Added sort functionality for products

3. **Filter Sidebar**
   - Created a reusable filter component
   - Implemented all required filters:
     - Search (full-text search)
     - Price range (single maximum price input)
     - Subscription status (Yes/No/All)
     - Product categories (tags)
   - Added clear filters functionality
   - Integrated with URL synchronization for shareable filtered results

4. **URL Synchronization**
   - Implemented React Router DOM v6 for routing
   - Added `useSearchParams` hook for URL parameter management
   - URL parameters include: search, price, subscription, tags, page, limit, sort, order
   - Parameters are synchronized on initial mount and updated when filters/pagination change
   - Filters are shareable via URL copy/paste
   - Created utility functions for parameter parsing (`parseBooleanParam`, `parseNumberParam`)

5. **API Integration**
   - Used proper API endpoints from json-server
   - Implemented query parameters for filtering
   - Added pagination support
   - Used proper operators (\_like, \_gte, \_lte)

6. **React Router Setup**
   - Installed react-router-dom v6 with compatible TypeScript definitions
   - Added BrowserRouter wrapper to App.tsx
   - Resolved version compatibility issues

7. **Testing**
   - **Comprehensive Test Suite**: 21 total tests across 4 components
   - **FilterSidebar.test.tsx**: 6 tests covering rendering, interactions, form submissions, state management
   - **Header.test.tsx**: 5 tests covering content display, styling, structure
   - **ProductModal.test.tsx**: 8 tests covering product display, conditional rendering, interactions, accessibility
   - **ProductTable.test.tsx**: 8 tests covering table structure, data formatting, sorting functionality, modal interactions
   - **Test Infrastructure**: 
     - Used React Testing Library with fireEvent for interactions
     - Comprehensive coverage including edge cases, accessibility, error handling
     - Proper mock setup and cleanup for all components
     - Suppressed React DOM deprecation warnings in setupTests.js
   - **Test Refactoring**: Standardized all test files for consistency across components

### Technical Decisions

1. **State Management**
   - Used local state with URL synchronization
   - Used React Query for server state
   - URL serves as single source of truth for filter state
   - Proper type definitions for all data structures

2. **URL Management**
   - `useSearchParams` for direct URL parameter manipulation
   - Parameter conversion utilities for type safety
   - Automatic URL updates on filter changes
   - Browser history integration for navigation

3. **UI/UX**
   - Clean and modern design
   - Responsive layout
   - Clear visual feedback for user actions
   - Accessible form controls
   - Shareable URLs for filtered results

4. **Code Organization**
   - Component-based architecture
   - TypeScript for type safety
   - Proper separation of concerns
   - Reusable components and utility functions
   - Comprehensive test coverage with consistent patterns

5. **Testing Strategy**
   - Component-level unit tests
   - User interaction testing
   - Accessibility testing
   - Edge case coverage
   - Consistent test patterns across all components

### Key Features Implemented

1. **URL Synchronization**
   - All filter states are reflected in URL parameters
   - Shareable filtered results via URL
   - Browser back/forward navigation support
   - Initial state loaded from URL on page load

2. **Enhanced Pagination**
   - Custom items per page options
   - URL parameter synchronization
   - Proper state management across filter changes

3. **Robust Testing**
   - 21 comprehensive tests covering all components
   - Standardized test patterns and structures
   - Clean test output with suppressed deprecation warnings
   - Complete coverage of user interactions and edge cases

### Future Improvements

1. **Performance**
   - Add debouncing for search input
   - Implement virtual scrolling for large lists
   - Add request caching strategies

2. **Features**
   - Add advanced filtering options
   - Implement bulk actions
   - Add export functionality
   - Add filter presets/saved searches

3. **Testing**
   - Add integration tests
   - Add end-to-end tests
   - Add performance testing

4. **UI/UX**
   - Add animations for state changes
   - Improve mobile responsiveness
   - Add keyboard navigation
   - Add more accessibility features
   - Add filter history/recent searches

5. **URL Management**
   - Add URL slug-based filtering
   - Implement filter permalink sharing
   - Add URL validation and error handling
