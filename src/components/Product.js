import React, {Component} from 'react';
import VariantSelector from './VariantSelector';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  componentWillMount() {
    this.props.product.options.forEach((selector) => {
      this.setState({
        selectedOptions: { [selector.name]: selector.values[0].value }
      });
    });
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  handleOptionChange(event) {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.product.variants.find((variant) => {
      return variant.selectedOptions.every((selectedOption) => {
        return selectedOptions[selectedOption.name] === selectedOption.value.valueOf();
      });
    });

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image.src
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0].src
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    // let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={this.handleOptionChange}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return (
       
       <tr>
        <td>
        {this.props.product.images.length ? 
        <img className="img-fluid" width="200" height="200" src={variantImage} alt={`${this.props.product.title} product shot`}/> : null}
        </td>

        <td>
        <h5 className="Product__title">{this.props.product.title}</h5>
        </td>

        <td>  

        <span className="Product__price">${variant.price}</span>
        
        </td>

        <td>
        {variantSelectors}
        </td>

        </tr>

    );
  }
}

export default Product;
