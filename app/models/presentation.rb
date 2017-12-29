class Presentation < ApplicationRecord
  belongs_to :account
  has_many :presentation_samples 
  has_many :samples, through: :presentation_samples

  accepts_nested_attributes_for :presentation_samples
end
