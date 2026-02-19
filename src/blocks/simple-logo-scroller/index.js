import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './style.scss';
import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    ToggleControl,
    RangeControl,
    TextControl,
    SelectControl,
    ColorPicker
} from '@wordpress/components';
import { useState, useRef, useEffect } from '@wordpress/element';

import metadata from './block.json';

const LogoItem = ({ logo, index, logoHeight, onRemove, isEditor = false, hoverEffect = 'scale' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`sls-logo-item ${isEditor ? 'sls-editor-item' : ''} ${logo.link ? 'has-link' : ''} hover-${hoverEffect}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="sls-logo-image"
                style={{ height: `${logoHeight}px` }}
            >
                <img
                    src={logo.url}
                    alt={logo.alt || ''}
                    loading="lazy"
                />
                {isEditor && logo.link && (
                    <div className="sls-link-indicator" title={__('This logo has a link', 'logo-carousel-block')}>
                        🔗
                    </div>
                )}
                {isEditor && isHovered && (
                    <div className="sls-logo-controls">
                        <Button
                            onClick={() => onRemove(index)}
                            className="sls-remove-logo"
                            variant="secondary"
                            size="small"
                            icon="no-alt"
                            isDestructive
                            title={__('Remove Logo', 'logo-carousel-block')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const Edit = ({ attributes, setAttributes }) => {
    const { logos, autoScroll, scrollSpeed, logosPerView, logoHeight, showPagination, hoverEffect, paginationColor, paginationSize, paginationRadius } = attributes;
    const [activeDevice, setActiveDevice] = useState('desktop');

    const blockProps = useBlockProps({
        className: 'wp-block-logo-carousel-block'
    });

    const handleLogoSelect = (newLogos) => {
        const logoData = newLogos.map(logo => ({
            id: logo.id,
            url: logo.url,
            alt: logo.alt || '',
            link: ''
        }));
        setAttributes({ logos: logoData });
    };

    const handleLogoRemove = (indexToRemove) => {
        const filteredLogos = logos.filter((_, index) => index !== indexToRemove);
        setAttributes({ logos: filteredLogos });
    };

    const handleLogoUpdate = (index, property, value) => {
        const updatedLogos = [...logos];
        updatedLogos[index][property] = value;
        setAttributes({ logos: updatedLogos });
    };

    const deviceOptions = [
        { key: 'desktop', label: __('Desktop', 'logo-carousel-block'), icon: '🖥️' },
        { key: 'tablet', label: __('Tablet', 'logo-carousel-block'), icon: '📱' },
        { key: 'mobile', label: __('Mobile', 'logo-carousel-block'), icon: '📱' }
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Logo Settings', 'logo-carousel-block')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={handleLogoSelect}
                            allowedTypes={['image']}
                            multiple={true}
                            gallery={true}
                            value={logos.map(logo => logo.id)}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    variant={logos.length === 0 ? 'primary' : 'secondary'}
                                    style={{ marginBottom: '16px' }}
                                >
                                    {logos.length === 0
                                        ? __('Select Logos', 'logo-carousel-block')
                                        : __('Edit Logos', 'logo-carousel-block')
                                    }
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>

                    <RangeControl
                        label={__('Logo Height (px)', 'logo-carousel-block')}
                        value={logoHeight}
                        onChange={(value) => setAttributes({ logoHeight: value })}
                        min={40}
                        max={200}
                    />

                    <SelectControl
                        label={__('Hover Effect', 'logo-carousel-block')}
                        value={hoverEffect}
                        onChange={(value) => setAttributes({ hoverEffect: value })}
                        options={[
                            { label: __('None', 'logo-carousel-block'), value: 'none' },
                            { label: __('Scale', 'logo-carousel-block'), value: 'scale' },
                            { label: __('Fade', 'logo-carousel-block'), value: 'fade' },
                            { label: __('Brighten', 'logo-carousel-block'), value: 'brighten' }
                        ]}
                        help={__('Choose hover animation for logos', 'logo-carousel-block')}
                    />
                </PanelBody>

                <PanelBody title={__('Responsive Settings', 'logo-carousel-block')} initialOpen={false}>
                    <div style={{ display: 'flex', marginBottom: '16px' }}>
                        {deviceOptions.map(device => (
                            <Button
                                key={device.key}
                                onClick={() => setActiveDevice(device.key)}
                                variant={activeDevice === device.key ? 'primary' : 'secondary'}
                                style={{ marginRight: '8px', fontSize: '12px' }}
                            >
                                {device.icon} {device.label}
                            </Button>
                        ))}
                    </div>

                    <RangeControl
                        label={__(`Logos per View (${activeDevice})`, 'logo-carousel-block')}
                        value={logosPerView[activeDevice]}
                        onChange={(value) => setAttributes({
                            logosPerView: { ...logosPerView, [activeDevice]: value }
                        })}
                        min={1}
                        max={8}
                    />
                </PanelBody>

                <PanelBody title={__('Scroll Settings', 'logo-carousel-block')} initialOpen={false}>
                    <ToggleControl
                        label={__('Auto Scroll', 'logo-carousel-block')}
                        checked={autoScroll}
                        onChange={(value) => setAttributes({ autoScroll: value })}
                    />

                    {autoScroll && (
                        <RangeControl
                            label={__('Scroll Speed', 'logo-carousel-block')}
                            value={scrollSpeed}
                            onChange={(value) => setAttributes({ scrollSpeed: value })}
                            min={10}
                            max={100}
                        />
                    )}

                    <ToggleControl
                        label={__('Show Pagination Dots', 'logo-carousel-block')}
                        checked={showPagination}
                        onChange={(value) => setAttributes({ showPagination: value })}
                        help={__('Display navigation dots below the logos', 'logo-carousel-block')}
                    />

                    {showPagination && (
                        <>
                            <div style={{ marginTop: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                    {__('Pagination Dot Color', 'logo-carousel-block')}
                                </label>
                                <ColorPicker
                                    color={paginationColor}
                                    onChange={(color) => setAttributes({ paginationColor: color })}
                                />
                            </div>

                            <RangeControl
                                label={__('Dot Size (px)', 'logo-carousel-block')}
                                value={paginationSize}
                                onChange={(value) => setAttributes({ paginationSize: value })}
                                min={8}
                                max={20}
                                help={__('Size of pagination dots', 'logo-carousel-block')}
                            />

                            <RangeControl
                                label={__('Dot Roundness (%)', 'logo-carousel-block')}
                                value={paginationRadius}
                                onChange={(value) => setAttributes({ paginationRadius: value })}
                                min={0}
                                max={50}
                                help={__('0% = square, 50% = circle', 'logo-carousel-block')}
                            />
                        </>
                    )}
                </PanelBody>

                {logos.length > 0 && (
                    <PanelBody title={__('Logo Links', 'logo-carousel-block')} initialOpen={false}>
                        <p style={{ marginBottom: '16px', fontSize: '13px', color: '#666' }}>
                            {__('Add URLs to make your logos clickable:', 'logo-carousel-block')}
                        </p>
                        {logos.map((logo, index) => (
                            <div
                                key={logo.id || index}
                                style={{
                                    marginBottom: '16px',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    backgroundColor: '#f9f9f9'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '8px'
                                }}>
                                    <img
                                        src={logo.url}
                                        alt={logo.alt || ''}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            objectFit: 'contain',
                                            marginRight: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '2px'
                                        }}
                                    />
                                    <strong style={{ fontSize: '14px' }}>
                                        {logo.alt || `Logo ${index + 1}`}
                                    </strong>
                                </div>
                                <TextControl
                                    label={__('Link URL', 'logo-carousel-block')}
                                    value={logo.link || ''}
                                    onChange={(url) => handleLogoUpdate(index, 'link', url)}
                                    placeholder={__('https://example.com', 'logo-carousel-block')}
                                    type="url"
                                />
                            </div>
                        ))}
                    </PanelBody>
                )}
            </InspectorControls>

            <div {...blockProps} style={{
                '--sls-pagination-color': paginationColor,
                '--sls-pagination-size': `${paginationSize}px`,
                '--sls-pagination-radius': `${paginationRadius}%`
            }}>
                {logos.length === 0 ? (
                    <div className="sls-placeholder">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={handleLogoSelect}
                                allowedTypes={['image']}
                                multiple={true}
                                gallery={true}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        variant="primary"
                                        size="large"
                                    >
                                        {__('Add Logos', 'logo-carousel-block')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        <p>{__('Select multiple images to create your simple logo scroller', 'logo-carousel-block')}</p>
                    </div>
                ) : (
                    <div className={`sls-scroller-wrapper ${showPagination ? 'has-pagination' : ''}`}>
                        <div className="sls-scroller-container">
                            <div className="sls-scroller-track">
                                {logos.map((logo, index) => (
                                    <LogoItem
                                        key={logo.id || index}
                                        logo={logo}
                                        index={index}
                                        logoHeight={logoHeight}
                                        onRemove={handleLogoRemove}
                                        isEditor={true}
                                        hoverEffect={hoverEffect}
                                    />
                                ))}
                            </div>
                        </div>
                        {showPagination && (
                            <div className="sls-pagination">
                                {logos.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`sls-dot ${index === 0 ? 'active' : ''}`}
                                        type="button"
                                        aria-label={__(`Logo ${index + 1}`, 'logo-carousel-block')}
                                        style={{ pointerEvents: 'none' }} // Disable clicks in editor
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

const Save = ({ attributes }) => {
    const { logos, autoScroll, scrollSpeed, logosPerView, logoHeight, showPagination, hoverEffect, paginationColor, paginationSize, paginationRadius } = attributes;

    if (!logos || logos.length === 0) return null;

    const blockProps = useBlockProps.save({
        className: 'wp-block-logo-carousel-block'
    });

    return (
        <div {...blockProps} style={{
            '--sls-pagination-color': paginationColor,
            '--sls-pagination-size': `${paginationSize}px`,
            '--sls-pagination-radius': `${paginationRadius}%`
        }}>
            <div className={`sls-scroller-wrapper ${showPagination ? 'has-pagination' : ''}`}>
                <div
                    className="sls-scroller-container"
                    data-auto-scroll={autoScroll}
                    data-scroll-speed={scrollSpeed}
                    data-logos-desktop={logosPerView.desktop}
                    data-logos-tablet={logosPerView.tablet}
                    data-logos-mobile={logosPerView.mobile}
                    data-show-pagination={showPagination}
                >
                    <div className="sls-scroller-track">
                        {logos.map((logo, index) => (
                            <div key={logo.id || index} className={`sls-logo-item ${logo.link ? 'has-link' : ''} hover-${hoverEffect}`}>
                                <div
                                    className="sls-logo-image"
                                    style={{ height: `${logoHeight}px` }}
                                >
                                    {logo.link ? (
                                        <a
                                            href={logo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={logo.alt ? `${logo.alt} - ${__('Opens in new tab', 'logo-carousel-block')}` : __('Logo link - Opens in new tab', 'logo-carousel-block')}
                                        >
                                            <img
                                                src={logo.url}
                                                alt={logo.alt || ''}
                                                loading="lazy"
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={logo.url}
                                            alt={logo.alt || ''}
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {showPagination && (
                    <div className="sls-pagination">
                        {logos.map((_, index) => (
                            <button
                                key={index}
                                className={`sls-dot ${index === 0 ? 'active' : ''}`}
                                type="button"
                                data-page={index}
                                aria-label={__(`Logo ${index + 1}`, 'logo-carousel-block')}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
});