class PresentationSample < ApplicationRecord
    belongs_to :sample
    belongs_to :presentation

    default_scope { order(sort_id: :asc) }
    validates_uniqueness_of :sample_id, :scope => :presentation_id
end
