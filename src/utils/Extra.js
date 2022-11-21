<div className="d-flex justify-content-center">
    <BoxOuterDiv>
        <Grid container>
            <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Age
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleChange}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                    <TextField
                        fullWidth
                        label="First Name"
                        id="fullWidth"
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                    <TextField fullWidth label="Last Name" id="fullWidth" />
                </div>
            </Grid>
            <Grid item xs={12} sm={6} mt={1}>
                <div className="ms-2 me-2 mt-2">
                    <TextField
                        fullWidth
                        label="$ Your Service Hourly Rate"
                        id="fullWidth"
                    />
                </div>
            </Grid>
            <Grid item xs={12} mt={1}>
                <div className="ms-2 me-2 mt-2">
                    <TextField
                        fullWidth
                        label="Add Your Tagline Here"
                        id="fullWidth"
                    />
                </div>
            </Grid>
            <Grid item xs={12} mt={1}>
                <div className="ms-2 me-2 mt-2">
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={6}
                    // defaultValue="Description"
                    />
                </div>
            </Grid>
        </Grid>
    </BoxOuterDiv>
</div>



{/* Personal Details End */ }
{/* upload Profile Photos Box Starts */ }
<div className="mt-4">
    <div className="block"></div>
    <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} sm={10.65}>
            <HeaderDiv>
                <div className="ps-2 d-flex flex-row align-items-center">
                    <ActivePageMarker></ActivePageMarker>
                    <HeaderP className="pt-1">Profile Photo</HeaderP>
                </div>
            </HeaderDiv>
        </Grid>
        <Grid item xs={12} sm={10.65}>
            <p className="mt-2 ms-3">
                Select and uplaod three photos that you want to show as
                your profile picture.
            </p>
        </Grid>
        <Grid item xs={12}>
            <div className="d-flex flex-row">
                <UplaodButttonBox>
                    <div>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                // write your building UI
                                <div>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        style={{
                                            backgroundColor: colors.becomePartnerGreen,
                                            marginBottom: 10,
                                        }}
                                        onClick={onImageUpload}
                                    >
                                        Select File
                                    </Button>
                                    <Grid
                                        container
                                        className="d-flex justify-content-center"
                                    >
                                        {imageList.map((image, index) => (
                                            <Grid item xm={12} sm={6} md={4}>
                                                <div key={index}>
                                                    <ProfileImageDiv>
                                                        <img
                                                            src={image.data_url}
                                                            alt=""
                                                            width="150"
                                                        />
                                                    </ProfileImageDiv>
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            style={{
                                                                backgroundColor: "#00CC8D",
                                                                marginBottom: 10,
                                                            }}
                                                            className="ms-2"
                                                            onClick={() => onImageUpdate(index)}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            style={{
                                                                backgroundColor: "#00CC8D",
                                                                marginBottom: 10,
                                                            }}
                                                            className="ms-md-4 ms-3"
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                    {images?.length > 0 ? (
                        <div></div>
                    ) : (
                        <ProfileImageDiv>
                            <div>
                                <img
                                    src={profileImageTemplate}
                                    width="150px"
                                ></img>
                            </div>
                        </ProfileImageDiv>
                    )}
                </UplaodButttonBox>
            </div>
        </Grid>
    </Grid>
</div>
{/* upload Profile Box Starts */ }
{/* upload Banner Photo Box Starts */ }
<div className="mt-4">
    <div className="block"></div>
    <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} sm={10.65}>
            <HeaderDiv>
                <div className="ps-2 d-flex flex-row align-items-center">
                    <ActivePageMarker></ActivePageMarker>
                    <HeaderP className="pt-1">Banner Photo</HeaderP>
                </div>
            </HeaderDiv>
        </Grid>
        <Grid item xs={12} sm={10.65}>
            <p className="mt-2 ms-3">
                Select and uplaod Banner photo that you want to show as
                your profile Banner.
            </p>
        </Grid>
        <Grid item xs={12}>
            <div className="d-flex flex-row">
                <UplaodButttonBox>
                    <div>
                        <ImageUploading
                            multiple
                            value={bannerimages}
                            onChange={onBnnerChange}
                            maxNumber={MaxBanners}
                            dataURLKey="data_url"
                            acceptType={["jpg"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                            }) => (
                                // write your building UI
                                <div>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        style={{
                                            backgroundColor: colors.becomePartnerGreen,
                                            marginBottom: 10,
                                        }}
                                        onClick={onImageUpload}
                                    >
                                        Select Banner Image
                                    </Button>
                                    <div>
                                        {imageList.map((image, index) => (
                                            <Grid item xm={12} sm={6} md={4}>
                                                <div key={index}>
                                                    <BannerImageDiv>
                                                        <img src={image.data_url} alt="" />
                                                    </BannerImageDiv>
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            style={{
                                                                backgroundColor: "#00CC8D",
                                                                marginBottom: 10,
                                                            }}
                                                            className="ms-2"
                                                            onClick={() => onImageUpdate(index)}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            style={{
                                                                backgroundColor: "#00CC8D",
                                                                marginBottom: 10,
                                                            }}
                                                            className="ms-md-4 ms-3"
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                    {bannerimages?.length > 0 ? (
                        <div></div>
                    ) : (
                        <BannerImageDiv>
                            <div>
                                <img src={bannerImageTemplate}></img>
                            </div>
                        </BannerImageDiv>
                    )}
                </UplaodButttonBox>
            </div>
        </Grid>
    </Grid>
</div>


{/* Select countries Box Starts */ }
<div className="mt-4">
    <div className="block"></div>
    <Grid container display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} sm={10.65}>
            <HeaderDiv>
                <div className="ps-2 d-flex flex-row align-items-center">
                    <ActivePageMarker></ActivePageMarker>
                    <HeaderP className="pt-1">Your Location</HeaderP>
                </div>
            </HeaderDiv>
        </Grid>
        <Grid
            item
            xs={12}
            className="pt-4 d-flex justify-content-center"
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={6}
                    className="d-flex justify-content-center"
                >
                    <CityNameDiv className="d-flex justify-content-center me-md-4 me-sm-4">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={CountryNAME}
                            sx={{ width: 270 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Country" />
                            )}
                        />
                    </CityNameDiv>
                </Grid>
                <Grid
                    item
                    xs={11}
                    md={6}
                    className="d-flex justify-content-center"
                >
                    <CityNameDiv className="d-flex justify-content-center ms-5">
                        <TextField
                            id="outlined-basic"
                            label="Enter City"
                            variant="outlined"
                            sx={{ width: 270 }}
                        />
                    </CityNameDiv>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
</div>
{/* Select countries Box ends */ }

const [images, setImages] = React.useState([]);
const [bannerimages, setBannerimages] = React.useState([]);

const maxNumber = 3;
const MaxBanners = 1;
const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
};
const onBnnerChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setBannerimages(imageList);
};
