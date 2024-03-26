export const Watermark = () => {
    return <div className="print:hidden overflow-y-hidden">
        <div style={{
            position: 'fixed',
            top: 'calc(66vh - 150px)',
            left: 'calc(50% - 128px)',
            height: '300px',
            width: '256px',
            backgroundImage: "url('/assets/veridibloc_logo.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 0.1,
        }}/>
    </div>
}

