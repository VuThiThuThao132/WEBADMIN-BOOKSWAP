import React, { useState, useEffect } from "react";
import axios from "axios";
import "./newPost.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const NewPost = () => {
    const [postData, setPostData] = useState({
        caption: "",
        description: "",
        exchangeMethod: "",
        city: "",
        district: "",
        bookPriceDTOS: [
            {
                price: "",
                bookPriceId: ""
            }
        ]
    });

    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJlNzgyM2VmMDFiZDRkMmI5NjI3NDE2NThkMjA4MDdlZmVlNmRlNWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVnUgVGhpIFRodSBUaGFvIChLMTUgSENNKSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMYlJ0cUFnMlB4N2ZrX3RLNmVURlpVLVlSVm9UOWZPOG15Mi1YcnVXZUphQT1zOTYtYyIsInJvbGUiOiJST0xFX1VTRVIiLCJhdXRob3JpdHkiOlsiQk9PSzpSRUFEIiwiQk9PSzpDUkVBVEUiLCJCT09LOk1PRElGWSIsIlBST0ZJTEU6TU9ESUZZIiwiQk9PSzpERUxFVEUiLCJQUk9GSUxFOlJFQUQiXSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Jvb2tzd2FwcGxhdGZvcm0iLCJhdWQiOiJib29rc3dhcHBsYXRmb3JtIiwiYXV0aF90aW1lIjoxNzAyOTAwNjA5LCJ1c2VyX2lkIjoiNE1lV2Fac0dPQU9jS2l5NjJkWDZiaUZhQjFJMiIsInN1YiI6IjRNZVdhWnNHT0FPY0tpeTYyZFg2YmlGYUIxSTIiLCJpYXQiOjE3MDI5MDA2MDksImV4cCI6MTcwMjkwNDIwOSwiZW1haWwiOiJ0aGFvdnR0c2UxNTAzMTlAZnB0LmVkdS52biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwNzEzOTczNzI5NzQ0MTk5MDEwIl0sImVtYWlsIjpbInRoYW92dHRzZTE1MDMxOUBmcHQuZWR1LnZuIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.c_UP6GbvDGwIJso95YXbn4wt-wwHgVgv8703E4e9yAZe4lRq6mMZr8y1CWFHl6_tzaeUWJ_P5TzIahkXlMU9B42N8ieoE5fqWo5IovLQvPWUnPfDWqGhV2Eo5x8TQdTMoRhiClrB8Pl76P__CSen02S7odMouLR3Kf77HYeMpIOBSaOpIgVslfnros8bwDCgwFvtRPJobN2wkFEyRrNh0d_nuVT2w1x0P5yJgx9TnqCAwFeSwJjXhuN8cfuZUg8XEJT05vuw4HaWtzIv4pcCDyN41v40WjOEj820yNI87UVTCux4WMLoCOfmywf-HfXj_LRADiq_D5RjoJ0aMbEb2w";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleBookPriceChange = (e, index, field) => {
        const { value } = e.target;
        const updatedBookPriceDTOS = [...postData.bookPriceDTOS];
        updatedBookPriceDTOS[index][field] = value;
        setPostData({ ...postData, bookPriceDTOS: updatedBookPriceDTOS });
    };

    const addBookPriceField = () => {
        const newBookPriceDTOS = [...postData.bookPriceDTOS, { price: '', bookPriceId: '' }];
        setPostData({ ...postData, bookPriceDTOS: newBookPriceDTOS });
    };

    const removeBookPriceField = (index) => {
        const updatedBookPriceDTOS = [...postData.bookPriceDTOS];
        updatedBookPriceDTOS.splice(index, 1);
        setPostData({ ...postData, bookPriceDTOS: updatedBookPriceDTOS });
    };

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const cityResponse = await axios.get(
                    'https://bookswapplatform.site/bookswap/api/v1/area/city',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (cityResponse.status === 200) {
                    setCities(cityResponse.data);
                }
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };

        fetchCityData();
    }, [token]);

    const handleCityChange = async (selectedCity) => {
        try {
            const districtResponse = await axios.get(
                `https://bookswapplatform.site/bookswap/api/v1/area/district?city=${selectedCity}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (districtResponse.status === 200) {
                setDistricts(districtResponse.data);
                setPostData((prevData) => ({
                    ...prevData,
                    city: selectedCity,
                }));
            }
        } catch (error) {
            console.error('Error fetching district data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://bookswapplatform.site/bookswap/api/v1/post/create',
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                console.log('Post created successfully:', response.data);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    return (
        <div className="newPost">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="bottom">
                    <form onSubmit={handleSubmit}>
                        <h1>ADD NEW POST</h1>
                        <div className="form-group">
                            <label htmlFor="caption">Caption:</label>
                            <input
                                type="text"
                                id="caption"
                                name="caption"
                                value={postData.caption}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={postData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exchangeMethod">Exchange Method:</label>
                            <input
                                type="text"
                                id="exchangeMethod"
                                name="exchangeMethod"
                                value={postData.exchangeMethod || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                City:
                                <select
                                    value={postData.city}
                                    onChange={(e) => handleCityChange(e.target.value)}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            {postData.city && (
                                <label>
                                    District:
                                    <select
                                        value={postData.district}
                                        onChange={(e) =>
                                            setPostData((prevData) => ({
                                                ...prevData,
                                                district: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="">Select District</option>
                                        {districts.map((district) => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}
                        </div>

                        <div className="bookPriceDTOS">
                            <label htmlFor="bookPriceDTOS">Book Price DTOS:</label>
                            <button type="button" onClick={addBookPriceField}>
                                Add Book Price
                            </button>
                            {postData.bookPriceDTOS.map((item, index) => (
                                <div key={index}>
                                    <div className="form-group">
                                        <label htmlFor={`price_${index}`}>Price:</label>
                                        <input
                                            type="number"
                                            id={`price_${index}`}
                                            name={`price_${index}`}
                                            value={item.price}
                                            onChange={(e) => handleBookPriceChange(e, index, 'price')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`bookPriceId_${index}`}>Book Price Id:</label>
                                        <input
                                            type="text"
                                            id={`bookPriceId_${index}`}
                                            name={`bookPriceId_${index}`}
                                            value={item.bookPriceId}
                                            onChange={(e) => handleBookPriceChange(e, index, 'bookPriceId')}
                                        />
                                    </div>
                                    <button type="button" onClick={() => removeBookPriceField(index)}>
                                        x
                                    </button>
                                </div>
                            ))}

                        </div>


                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
