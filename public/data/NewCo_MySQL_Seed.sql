
-- users
INSERT INTO users (id, name, username, email, role, status)
VALUES ('u-1001', 'Anand Singh', 'anand.singh', 'anand@example.com', 'admin', 'active');

/* settings_menu */
-- Insert parent sections (with NULL parent_id)
INSERT INTO settings_menu (title, parent_id, display_order) VALUES
('Access Control', NULL, 1),
('Deal Setup', NULL, 2),
('Common Setup', NULL, 3),
('Configure', NULL, 4),
('Claim Setup', NULL, 5);

-- Insert menu items (with parent_id referencing their section)
INSERT INTO settings_menu (route_id, label, icon, parent_id, display_order) VALUES
-- Access Control items
('underprogress', 'Define Users', 'User', 1, 1),

-- Deal Setup items
('underprogress', 'Deal Type', 'Handshake', 2, 1),

-- Common Setup items
('underprogress', 'Lookups', 'Search', 3, 1),
('underprogress', 'Status Transition', 'GitBranch', 3, 2),
('divisions', 'Divisions', 'Layers', 3, 3),

-- Configure items
('underprogress', 'Sections', 'LayoutGrid', 4, 1),

-- Claim Setup items
('underprogress', 'Claim Types', 'ListChecks', 5, 1),
('underprogress', 'Claim Reasons', 'HelpCircle', 5, 2);

/* navigation_menu */
-- Insert parent sections (top-level menu items)
INSERT INTO navigation_menu (title, parent_id, display_order) VALUES
('Overview', NULL, 1),
('Programs & Agreements', NULL, 2),
('Deals & Bids', NULL, 3),
('Finance', NULL, 4),
('Reference Data', NULL, 5);

-- Insert menu items for each section
-- Overview items
INSERT INTO navigation_menu (route_id, label, icon, parent_id, display_order) VALUES
('dashboard', 'Dashboard', 'LayoutDashboard', 1, 1);

-- Programs & Agreements items
INSERT INTO navigation_menu (route_id, label, icon, parent_id, display_order) VALUES
('billbacks', 'Billback', 'BadgeDollarSign', 2, 1);

-- Deals & Bids items
INSERT INTO navigation_menu (route_id, label, icon, parent_id, display_order) VALUES
('deals', 'Deals', 'Handshake', 3, 1),
('underprogress', 'Bids', 'Gavel', 3, 2);

-- Finance items
INSERT INTO navigation_menu (route_id, label, icon, parent_id, display_order) VALUES
('underprogress', 'Vendor Billings', 'ReceiptText', 4, 1),
('underprogress', 'Customer Payments', 'CreditCard', 4, 2),
('underprogress', 'Schedule Payments', 'CalendarClock', 4, 3);

-- Reference Data items
INSERT INTO navigation_menu (route_id, label, icon, parent_id, display_order) VALUES
('underprogress', 'Products', 'Package', 5, 1),
('underprogress', 'Item Summary', 'Boxes', 5, 2),
('underprogress', 'Claims', 'ShieldAlert', 5, 3);


/* allSettings  */
-- Insert parent sections (top-level menu items)
INSERT INTO allSettings (title, parent_id, display_order) VALUES
('Access Control', NULL, 1),
('Deal Setup', NULL, 2),
('Billback Setup', NULL, 3),
('Common Setup', NULL, 4),
('Accounting Setup', NULL, 5),
('Configure', NULL, 6),
('Claim Setup', NULL, 7),
('Integrations', NULL, 8),
('DataMesh', NULL, 9),
('Funds Setup', NULL, 10);

-- Insert menu items for each section
-- Access Control items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('setupRolesPanel', 'Define Roles & Permissions', 'KeyRound', 1, 1),
('setupUsersPanel', 'Define Users', 'User', 1, 2),
('entitlementPanel', 'Entitlements', 'BadgeCheck', 1, 3);

-- Deal Setup items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('dealTypePanel', 'Deal Type', 'Handshake', 2, 1),
('feeTypeGridPanel', 'Fee Type', 'BadgeDollarSign', 2, 2),
('performancePanel', 'Performance', 'TrendingUp', 2, 3),
('volumeTierSetupPanel', 'Volume Tier Setup', 'BarChart3', 2, 4);

-- Billback Setup items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('billbackTypePanel', 'Billback Type', 'FileText', 3, 1),
('disputeCodesPanel', 'Dispute Codes', 'AlertTriangle', 3, 2);

-- Common Setup items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('lookupPanel', 'Lookups', 'Search', 4, 1),
('statusRulePanel', 'Status Transition', 'GitBranch', 4, 2),
('stringRepoPanel', 'String Repository', 'Library', 4, 3),
('approvalRulePanel', 'Approval Rules', 'CheckCircle2', 4, 4),
('divisionPanel', 'Division', 'Layers', 4, 5),
('notificationPanel', 'Notifications', 'Bell', 4, 6),
('termsPanel', 'Terms', 'FileText', 4, 7),
('reportPanel', 'Reports', 'BarChart2', 4, 8),
('codeConversionPanel', 'Mapping Setup', 'Map', 4, 9),
('uploadTemplatesPanel', 'Upload Templates', 'Upload', 4, 10);

-- Accounting Setup items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('ledgerPanel', 'Ledger', 'BookOpen', 5, 1),
('accountingPeriodPanel', 'Accounting Periods', 'Calendar', 5, 2),
('periodOpenClosePanel', 'Period Open Close', 'Lock', 5, 3);

-- Configure items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('customServicesPanel', 'Services', 'Settings', 6, 1),
('extensionSummary', 'Extensions', 'Puzzle', 6, 2),
('customSectionsPanel', 'Sections', 'LayoutGrid', 6, 3);

-- Claim Setup items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('claimTypePanel', 'Claim Types', 'ListChecks', 7, 1),
('claimReasonPanel', 'Claim Reasons', 'HelpCircle', 7, 2);

-- Integrations items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('entitiesPanel', 'Entities', 'Network', 8, 1),
('connectionsPanel', 'Connections', 'Plug', 8, 2),
('servicesPanel', 'Services', 'Server', 8, 3),
('idIntegrationsSummary', 'Integrations', 'Layers', 8, 4),
('idSchedulesSummary', 'Schedules', 'CalendarClock', 8, 5),
('ledgerFtpDirMappingPanel', 'Ledger Directory Mapping', 'Folder', 8, 6);

-- DataMesh items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('dataMeshMappingPanel', 'DataMesh Mapping', 'Database', 9, 1);

-- Funds Setup items
INSERT INTO allSettings (route_id, label, icon, parent_id, display_order) VALUES
('fundTypePanel', 'Fund Type', 'DollarSign', 10, 1),
('fundsHierarchyPanel', 'Funds Hierarchy', 'Tree', 10, 2);

/* all settings_menu */
-- Create the table structure
-- Insert parent sections (top-level menu items)
INSERT INTO allMenu (title, parent_id, display_order) VALUES
('Overview', NULL, 1),
('Programs & Agreements', NULL, 2),
('Deals & Bids', NULL, 3),
('Finance', NULL, 4),
('Reference Data', NULL, 5);

-- Insert menu items for each section
-- Overview items
INSERT INTO allMenu (route_id, label, icon, parent_id, display_order) VALUES
('dashboard', 'Dashboard', 'LayoutDashboard', 1, 1),
('vendorDashboard', 'Partner Dashboard', 'Briefcase', 1, 2),
('supersetDashboard', 'Superset Dashboard', 'BarChart3', 1, 3),
('vendorStoryBoard', 'Vendor Storyboard', 'Users', 1, 4),
('customerStoryBoard', 'Customer Storyboard', 'Users', 1, 5);

-- Programs & Agreements items
INSERT INTO allMenu (route_id, label, icon, parent_id, display_order) VALUES
('canprogramSummary', 'CAN Programs', 'BookOpen', 2, 1),
('programSummary', 'Programs', 'Layers', 2, 2),
('podagreementSummary', 'POD Agreement', 'FileSignature', 2, 3),
('pod2agreementSummary', 'POD2 Agreement', 'FileSignature', 2, 4),
('pod9agreementSummary', 'POD9 Agreement', 'FileSignature', 2, 5),
('billbackagreementSummary', 'Billback Agreements', 'FileText', 2, 6),
('PurchaseBasedRebatesSummary', 'Purchase‑Based Rebates', 'Percent', 2, 7),
('vendorrebatesSummary', 'Vendor Rebates', 'Percent', 2, 8),
('commissionsSummary', 'Commissions', 'BadgeDollarSign', 2, 9),
('billbackSummary', 'Billback', 'BadgeDollarSign', 2, 10);

-- Deals & Bids items
INSERT INTO allMenu (route_id, label, icon, parent_id, display_order) VALUES
('deals', 'Deals', 'Handshake', 3, 1),
('bidSummary', 'Bids', 'Gavel', 3, 2);

-- Finance items
INSERT INTO allMenu (route_id, label, icon, parent_id, display_order) VALUES
('paymentSummary', 'Vendor Billings', 'ReceiptText', 4, 1),
('customerPaymentSummary', 'Customer Payments', 'CreditCard', 4, 2),
('schedulePayment', 'Schedule Payments', 'CalendarClock', 4, 3);

-- Reference Data items
INSERT INTO allMenu (route_id, label, icon, parent_id, display_order) VALUES
('companiesSummary', 'Companies', 'Building2', 5, 1),
('productsSummary', 'Products', 'Package', 5, 2),
('itemsSummary', 'Item Summary', 'Boxes', 5, 3),
('priceListSummary', 'Price List', 'Tag', 5, 4),
('planMain', 'Plans', 'Layers', 5, 5),
('tracingSummary', 'Tracing', 'Map', 5, 6),
('claimSummary', 'Claims', 'ShieldAlert', 5, 7);

/* Deal Types */
-- Insert the sample data
INSERT INTO dealtypes (id, deal_type, deal_type_name, deal_type_access, active_flag) VALUES
(41, 'ADP', 'AD Planning', 'BOTH', 'Y'),
(87, 'M-AF-RM', 'Admin Fee - Rocky Mount', 'INTERNAL', 'Y'),
(92, 'M-AFP', 'Administration Fee', 'BOTH', 'Y'),
(165, 'AP_CHANNEL_SALES_DEAL', 'AP Channel Sales Deal', 'BOTH', 'Y'),
(169, 'AP_SAL_ALW_DEL_NEW', 'AP Sales Allowance Deal New', 'BOTH', 'Y'),
(153, 'AP_TEST', 'AP test Deal type', 'BOTH', 'Y'),
(167, 'Auto-QA BSD', 'Auto-QA Buy Side Deal', 'BOTH', 'Y'),
(168, 'Auto-QA SSD', 'Auto-QA Sell Side Deal', 'BOTH', 'Y');

/* Divisions */
-- Insert the sample data
INSERT INTO divisions (
    id, name, division_code, division_type, active_flag,
    start_date, end_date, operating_unit, legal_entity,
    ledger, credit_account, debit_account, parent_division_id,
    accounted_currency
) VALUES
(277, 'Chewy', '100', 'DC', TRUE, 
 NULL, NULL, '', '', 
 '300000006364022', '', '', 246, 
 ''),
 
(276, 'Chewy Corp (CHWY)', 'CHWY', 'DC', TRUE, 
 NULL, NULL, NULL, NULL, 
 NULL, NULL, NULL, 1, 
 NULL),
 
(274, 'RCM GR TEST', 'RCM278860', 'W', TRUE, 
 NULL, NULL, '', '', 
 '23456789', '', '', 274, 
 'INR'),
 
(271, 'RCM00000123 Name', 'RCM00000123', 'W', FALSE, 
 '2023-10-03', '2023-10-31', 'RCM00000123 Operating Unit', 'RCM00000123 Legal entity', 
 'RCM00000123 Ledger', '', 'test', 1, 
 'USD'),
 
(257, 'RCM0001 Name', 'RCM0001', 'BU', FALSE, 
 '2023-08-31', '2023-09-29', 'RCM0001 Operating Unit', 'RCM0001 Legal entity', 
 'RCM0001 Ledger', 'Test BU', 'Test BU', 245, 
 'USD'),
 
(270, 'RCM00011 Name', 'RCM00011', 'BU', FALSE, 
 '2023-10-04', '2023-09-30', 'RCM00011 Operating Unit', 'RCM00011 Legal entity', 
 'RCM00011 Ledger', '', '', 13, 
 'test');


/* Deals */
-- Insert the sample data
INSERT INTO deals (
    deal_name, deal_status_code, deal_status, deal_start_date, deal_end_date,
    deal_type_id, vendor_id, vendor_name, tier_break_type
) VALUES
('RCM Deal - 102-7', 'DRAFT', 'Draft', '2021-01-01', NULL, 9, 4, 'RCM1002 Name', NULL),
('P R Test-087654', 'DRAFT', 'Draft', '2022-12-31', '2022-12-31', 132, 2161, 'RCM00112724 Name', NULL),
('PSBBB_26-04-24cxcxcxzxz-10', 'DRAFT', 'Draft', '2022-01-01', '2050-12-31', 140, 2161, 'RCM00112724 Name', NULL),
('PSBBB_26-04-24xzxz-10', 'DRAFT', 'Draft', '2022-01-01', '2050-12-31', 140, 2161, 'RCM00112724 Name', NULL),
('Integration-Testing-2025-06-05T05-00-59.832Z', 'DRAFT', 'Draft', '2020-01-01', '2030-12-31', 140, 2163, 'RCM00190799 Name', NULL),
('Integration-Testing-2025-06-04T14-51-37.555Z', 'DRAFT', 'Draft', '2020-01-01', '2030-12-31', 140, 2163, 'RCM00190799 Name', NULL),
('Integration-Testing-2025-06-04T14-39-26.422Z', 'DRAFT', 'Draft', '2020-01-01', '2030-12-31', 140, 2163, 'RCM00190799 Name', NULL),
('Integration-Testing-2025-06-04T14-28-10.109Z', 'DRAFT', 'Draft', '2020-01-01', '2030-12-31', 140, 2163, 'RCM00190799 Name', NULL),
('PSBBB_26-04-24-10', 'DRAFT', 'Draft', '2022-01-01', '2050-12-31', 140, 2161, 'RCM00112724 Name', NULL),
('PSBBB_26-04-24-9', 'DRAFT', 'Draft', '2022-01-01', '2050-12-31', 140, 2161, 'RCM00112724 Name', NULL),
('Copy-2 of GR Reg TC-33192923', 'DRAFT', 'Draft', '2022-12-29', '2023-12-31', 132, 2161, 'RCM00112724 Name', 'BACK_TO_DOLLAR_1'),
('Integration-Testing-2025-05-21T15-29-51.446Z', 'DRAFT', 'Draft', '2020-01-01', '2030-12-31', 140, 2163, 'RCM00190799 Name', NULL);

-- Insert the sample data
INSERT INTO status_codes (
    id, status_code, display_value, status_for, 
    show_in_lov_flag, creation_date, last_update_date
) VALUES
(49, 'ACCEPT_IN_PROGRESS', 'Accept In Progress', 'DEAL', 'Y', NULL, NULL),
(12, 'ACCEPTED', 'Accepted', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(6, 'ACTIVE', 'Active', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(48, 'APPROVAL_IN_PROGRESS', 'Approval In Progress', 'DEAL', 'Y', NULL, NULL),
(24, 'APPROVED', 'Approved', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(21, 'ASSIGNED', 'Assigned', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(7, 'CANCELLED', 'Cancelled', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(103, 'CLOSED', 'Closed', 'DEAL', 'Y', NULL, NULL),
(25, 'DELETE', 'Delete', 'DEAL', 'N', '2014-10-27', '2014-10-27'),
(5, 'DRAFT', 'Draft', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(26, 'EDIT', 'Edit', 'DEAL', 'N', '2014-10-27', '2014-10-27'),
(154, 'ESIGNATURE_COMPLETED', 'Esignature Completed', 'DEAL', 'Y', NULL, NULL),
(178, 'EXCEPTION', 'Exception', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(175, 'EXCEPTION', 'Exception', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(172, 'EXPIRED', 'Expired', 'DEAL', 'Y', NULL, NULL),
(197, 'LEGAL_APPROVAL', 'Legal Approved', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(19, 'MODIFIED', 'Modified', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(10, 'PENDING', 'Pending', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(159, 'PENDING_SIGNATURE', 'Pending Signature', 'DEAL', 'Y', NULL, NULL),
(153, 'PENDING_SIGNATURE', 'Pending Signature', 'DEAL', 'Y', NULL, NULL),
(196, 'PRICING_APPROVAL', 'Pricing Approved', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(11, 'PROCESSED', 'Processed', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(198, 'RBU_APPROVAL', 'RBU Approved', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(13, 'REJECTED', 'Rejected', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(150, 'RENEWED', 'Renewed', 'DEAL', 'Y', NULL, NULL),
(27, 'REQUEST_MODIFIED', 'Request For Modification', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(9, 'RESCIND', 'Rescind', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(22, 'RESCIND_CONFIRMED', 'Rescind Confirmed', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(23, 'RESCIND_DENIED', 'Rescind Denied', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(14, 'RESUBMITTED', 'Resubmitted', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(20, 'REVIEWED', 'Reviewed', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(152, 'SIGNATURE_IN_PROGRESS', 'Signature in Progress', 'DEAL', 'Y', NULL, NULL),
(158, 'SIGNATURE_IN_PROGRESS', 'Signature in Progress', 'DEAL', 'Y', NULL, NULL),
(8, 'SUBMITTED', 'Submitted', 'DEAL', 'Y', '2014-10-27', '2014-10-27'),
(118, 'SUPERCEDED', 'Superceded', 'DEAL', NULL, NULL, NULL);